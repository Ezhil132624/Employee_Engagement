import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, GradientBoostingRegressor
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import classification_report, mean_squared_error, r2_score
import joblib
from datetime import datetime, timedelta
from typing import Dict, List, Tuple

class TurnoverPredictor:
    """Predictive analytics for employee turnover risk"""
    
    def __init__(self):
        self.model = None
        self.scaler = StandardScaler()
        self.label_encoders = {}
        self.feature_importance = None
        self.is_trained = False
        
    def prepare_features(self, employees_df: pd.DataFrame, 
                        survey_df: pd.DataFrame, 
                        metrics_df: pd.DataFrame) -> pd.DataFrame:
        """Prepare features for turnover prediction"""
        
        # Merge all data
        data = employees_df.merge(survey_df, on='employee_id', how='left')
        data = data.merge(metrics_df, on='employee_id', how='left')
        
        # Calculate tenure in years
        data['tenure_years'] = data['tenure_days'] / 365.25
        
        # Create engagement features
        survey_cols = ['job_satisfaction', 'work_life_balance', 'career_development', 
                      'management_support', 'company_culture', 'compensation_satisfaction']
        
        for col in survey_cols:
            if col in data.columns:
                data[f'{col}_normalized'] = data[col] / 10.0
        
        # Create risk indicators
        data['low_satisfaction'] = (data['job_satisfaction'] <= 5).astype(int)
        data['poor_work_life_balance'] = (data['work_life_balance'] <= 5).astype(int)
        data['limited_career_dev'] = (data['career_development'] <= 5).astype(int)
        data['weak_management'] = (data['management_support'] <= 5).astype(int)
        
        # Encode categorical variables
        categorical_cols = ['department', 'work_arrangement', 'level']
        for col in categorical_cols:
            if col not in self.label_encoders:
                self.label_encoders[col] = LabelEncoder()
                data[f'{col}_encoded'] = self.label_encoders[col].fit_transform(data[col].fillna('Unknown'))
            else:
                data[f'{col}_encoded'] = self.label_encoders[col].transform(data[col].fillna('Unknown'))
        
        return data
    
    def generate_turnover_labels(self, data: pd.DataFrame) -> pd.DataFrame:
        """Generate synthetic turnover labels for training (in real scenario, use historical data)"""
        
        # Create turnover probability based on various factors
        turnover_prob = (
            0.3 * (data['job_satisfaction'] <= 4).astype(int) +
            0.2 * (data['work_life_balance'] <= 4).astype(int) +
            0.2 * (data['management_support'] <= 4).astype(int) +
            0.1 * (data['compensation_satisfaction'] <= 4).astype(int) +
            0.1 * (data['tenure_years'] < 0.5).astype(int) +
            0.1 * (data['tenure_years'] > 5).astype(int)
        )
        
        # Add some randomness
        turnover_prob += np.random.normal(0, 0.1, len(data))
        turnover_prob = np.clip(turnover_prob, 0, 1)
        
        # Convert to binary labels
        data['will_turnover'] = (turnover_prob > 0.4).astype(int)
        data['turnover_probability'] = turnover_prob
        
        return data
    
    def train_model(self, training_data: pd.DataFrame) -> Dict[str, float]:
        """Train the turnover prediction model"""
        
        # Select features for training
        feature_cols = [
            'tenure_years', 'job_satisfaction', 'work_life_balance', 'career_development',
            'management_support', 'company_culture', 'compensation_satisfaction',
            'engagement_score', 'satisfaction_score', 'sentiment_score',
            'department_encoded', 'work_arrangement_encoded', 'level_encoded',
            'low_satisfaction', 'poor_work_life_balance', 'limited_career_dev', 'weak_management'
        ]
        
        # Filter available features
        available_features = [col for col in feature_cols if col in training_data.columns]
        
        X = training_data[available_features].fillna(0)
        y = training_data['will_turnover']
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        # Scale features
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        # Train model
        self.model = RandomForestClassifier(n_estimators=100, random_state=42)
        self.model.fit(X_train_scaled, y_train)
        
        # Evaluate model
        train_score = self.model.score(X_train_scaled, y_train)
        test_score = self.model.score(X_test_scaled, y_test)
        
        # Feature importance
        self.feature_importance = pd.DataFrame({
            'feature': available_features,
            'importance': self.model.feature_importances_
        }).sort_values('importance', ascending=False)
        
        self.is_trained = True
        
        return {
            'train_accuracy': train_score,
            'test_accuracy': test_score,
            'features_used': len(available_features)
        }
    
    def predict_turnover_risk(self, employee_data: pd.DataFrame) -> pd.DataFrame:
        """Predict turnover risk for employees"""
        
        if not self.is_trained:
            raise ValueError("Model must be trained before making predictions")
        
        # Prepare features
        feature_cols = self.feature_importance['feature'].tolist()
        available_features = [col for col in feature_cols if col in employee_data.columns]
        
        X = employee_data[available_features].fillna(0)
        X_scaled = self.scaler.transform(X)
        
        # Make predictions
        turnover_prob = self.model.predict_proba(X_scaled)[:, 1]
        turnover_pred = self.model.predict(X_scaled)
        
        # Create results dataframe
        results = employee_data[['employee_id', 'name', 'department']].copy()
        results['turnover_risk'] = turnover_prob
        results['high_risk'] = (turnover_prob > 0.6).astype(int)
        results['risk_category'] = pd.cut(turnover_prob, 
                                        bins=[0, 0.3, 0.6, 1.0], 
                                        labels=['Low', 'Medium', 'High'])
        
        return results.sort_values('turnover_risk', ascending=False)
    
    def get_risk_factors(self, employee_id: str, employee_data: pd.DataFrame) -> Dict[str, any]:
        """Get specific risk factors for an employee"""
        
        employee = employee_data[employee_data['employee_id'] == employee_id].iloc[0]
        
        risk_factors = {
            'employee_id': employee_id,
            'overall_risk': employee.get('turnover_risk', 0),
            'factors': []
        }
        
        # Check various risk factors
        if employee.get('job_satisfaction', 10) <= 5:
            risk_factors['factors'].append('Low job satisfaction')
        
        if employee.get('work_life_balance', 10) <= 5:
            risk_factors['factors'].append('Poor work-life balance')
        
        if employee.get('management_support', 10) <= 5:
            risk_factors['factors'].append('Weak management support')
        
        if employee.get('career_development', 10) <= 5:
            risk_factors['factors'].append('Limited career development')
        
        if employee.get('tenure_years', 0) < 0.5:
            risk_factors['factors'].append('New employee (< 6 months)')
        
        if employee.get('engagement_score', 10) < 6:
            risk_factors['factors'].append('Low engagement score')
        
        return risk_factors

class EngagementPredictor:
    """Predict future engagement levels"""
    
    def __init__(self):
        self.model = GradientBoostingRegressor(n_estimators=100, random_state=42)
        self.scaler = StandardScaler()
        self.is_trained = False
    
    def train_engagement_model(self, data: pd.DataFrame) -> Dict[str, float]:
        """Train model to predict engagement scores"""
        
        feature_cols = [
            'tenure_years', 'job_satisfaction', 'work_life_balance', 
            'management_support', 'company_culture', 'compensation_satisfaction'
        ]
        
        available_features = [col for col in feature_cols if col in data.columns]
        
        X = data[available_features].fillna(data[available_features].mean())
        y = data['engagement_score'].fillna(data['engagement_score'].mean())
        
        # Split data
        X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
        
        # Scale and train
        X_train_scaled = self.scaler.fit_transform(X_train)
        X_test_scaled = self.scaler.transform(X_test)
        
        self.model.fit(X_train_scaled, y_train)
        
        # Evaluate
        train_pred = self.model.predict(X_train_scaled)
        test_pred = self.model.predict(X_test_scaled)
        
        self.is_trained = True
        
        return {
            'train_r2': r2_score(y_train, train_pred),
            'test_r2': r2_score(y_test, test_pred),
            'train_rmse': np.sqrt(mean_squared_error(y_train, train_pred)),
            'test_rmse': np.sqrt(mean_squared_error(y_test, test_pred))
        }

# Example usage
if __name__ == "__main__":
    # This would typically use the data from data_models.py
    from data_models import EmployeeEngagementData
    
    # Generate sample data
    ignite_data = EmployeeEngagementData().generate_sample_data(200)
    
    employees_df = ignite_data.get_employees_df()
    survey_df = ignite_data.get_survey_responses_df()
    metrics_df = ignite_data.get_engagement_metrics_df()
    
    # Initialize predictor
    predictor = TurnoverPredictor()
    
    # Prepare data
    training_data = predictor.prepare_features(employees_df, survey_df, metrics_df)
    training_data = predictor.generate_turnover_labels(training_data)
    
    # Train model
    results = predictor.train_model(training_data)
    print("Model Training Results:")
    print(f"Training Accuracy: {results['train_accuracy']:.3f}")
    print(f"Test Accuracy: {results['test_accuracy']:.3f}")
    
    # Make predictions
    risk_predictions = predictor.predict_turnover_risk(training_data)
    print(f"\nHigh Risk Employees: {(risk_predictions['high_risk'] == 1).sum()}")
    print("\nTop 5 At-Risk Employees:")
    print(risk_predictions[['name', 'department', 'turnover_risk', 'risk_category']].head())
    
    # Feature importance
    print("\nTop Risk Factors:")
    print(predictor.feature_importance.head())
