import pandas as pd
import numpy as np
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')

# Import all modules
from data_models import EmployeeEngagementData
from sentiment_analysis import SentimentAnalyzer
from predictive_analytics import TurnoverPredictor, EngagementPredictor
from analytics_dashboard import EngagementDashboard
from recommendations_engine import EngagementRecommendationsEngine

class IGNITESystem:
    """Main IGNITE Employee Engagement System"""
    
    def __init__(self):
        self.data_manager = EmployeeEngagementData()
        self.sentiment_analyzer = SentimentAnalyzer()
        self.turnover_predictor = TurnoverPredictor()
        self.engagement_predictor = EngagementPredictor()
        self.dashboard = EngagementDashboard()
        self.recommendations_engine = EngagementRecommendationsEngine()
        
        self.system_initialized = False
        self.last_analysis_date = None
        
    def initialize_system(self, num_employees=200):
        """Initialize the IGNITE system with sample data"""
        print("🚀 Initializing IGNITE Employee Engagement System...")
        
        # Generate sample data
        print("📊 Generating sample employee data...")
        self.data_manager.generate_sample_data(num_employees)
        
        # Get dataframes
        self.employees_df = self.data_manager.get_employees_df()
        self.survey_df = self.data_manager.get_survey_responses_df()
        self.metrics_df = self.data_manager.get_engagement_metrics_df()
        
        # Generate sample feedback for sentiment analysis
        print("💬 Analyzing employee sentiment...")
        sample_feedback = self.generate_sample_feedback()
        self.sentiment_df = self.sentiment_analyzer.analyze_feedback_batch(sample_feedback)
        
        # Train predictive models
        print("🤖 Training predictive models...")
        training_data = self.turnover_predictor.prepare_features(
            self.employees_df, self.survey_df, self.metrics_df
        )
        training_data = self.turnover_predictor.generate_turnover_labels(training_data)
        
        # Train turnover prediction model
        turnover_results = self.turnover_predictor.train_model(training_data)
        print(f"   Turnover Model Accuracy: {turnover_results['test_accuracy']:.3f}")
        
        # Train engagement prediction model
        engagement_results = self.engagement_predictor.train_engagement_model(training_data)
        print(f"   Engagement Model R²: {engagement_results['test_r2']:.3f}")
        
        # Initialize dashboard
        print("📈 Setting up analytics dashboard...")
        self.dashboard.load_data(self.employees_df, self.survey_df, self.metrics_df, self.sentiment_df)
        
        self.system_initialized = True
        self.last_analysis_date = datetime.now()
        
        print("✅ IGNITE System initialized successfully!")
        return self
    
    def generate_sample_feedback(self):
        """Generate sample employee feedback for sentiment analysis"""
        positive_feedback = [
            "I love the collaborative environment and growth opportunities here.",
            "Great work-life balance and supportive management team.",
            "Excellent benefits and compensation package. Very satisfied.",
            "Amazing company culture with innovative projects.",
            "Flexible work arrangements help me be more productive.",
            "Strong leadership and clear communication from management.",
            "Great learning opportunities and career development programs.",
            "Supportive colleagues and positive team dynamics.",
            "Company values align well with my personal values.",
            "Recognition and rewards system motivates me to do my best."
        ]
        
        negative_feedback = [
            "Overwhelming workload and unrealistic deadlines causing stress.",
            "Poor communication from management and lack of direction.",
            "Limited career advancement opportunities and stagnant growth.",
            "Toxic work environment with office politics and favoritism.",
            "Inadequate compensation compared to market standards.",
            "Micromanagement and lack of autonomy in decision making.",
            "Poor work-life balance affecting personal relationships.",
            "Outdated technology and inefficient processes.",
            "Lack of recognition for hard work and achievements.",
            "Unclear expectations and constantly changing priorities."
        ]
        
        neutral_feedback = [
            "The job is okay, nothing particularly exciting or concerning.",
            "Standard workplace with typical challenges and benefits.",
            "Some good aspects, some areas that could be improved.",
            "Average experience, meets basic expectations.",
            "Mixed feelings about the role and company direction.",
            "Decent workplace but room for improvement in several areas.",
            "Satisfactory job with standard benefits and challenges.",
            "Neither particularly satisfied nor dissatisfied overall.",
            "Adequate support from management, could be better.",
            "Fair compensation and reasonable work environment."
        ]
        
        # Combine and shuffle feedback
        all_feedback = positive_feedback + negative_feedback + neutral_feedback
        np.random.shuffle(all_feedback)
        
        # Select random subset matching number of employees
        num_feedback = min(len(self.employees_df), len(all_feedback))
        return all_feedback[:
