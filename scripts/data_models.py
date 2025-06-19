import pandas as pd
import numpy as np
from datetime import datetime, timedelta
from dataclasses import dataclass
from typing import List, Dict, Optional
import json

@dataclass
class Employee:
    """Employee data model"""
    employee_id: str
    name: str
    department: str
    role: str
    hire_date: datetime
    work_arrangement: str  # hybrid, remote, in-office
    level: str  # junior, mid, senior, leadership
    manager_id: Optional[str] = None
    
@dataclass
class SurveyResponse:
    """Survey response data model"""
    response_id: str
    employee_id: str
    survey_type: str  # eNPS, Gallup Q12, custom
    responses: Dict[str, any]
    sentiment_score: Optional[float] = None
    timestamp: datetime = datetime.now()

@dataclass
class EngagementMetrics:
    """Engagement metrics data model"""
    employee_id: str
    enps_score: float
    engagement_score: float
    satisfaction_score: float
    turnover_risk: float
    department: str
    last_updated: datetime = datetime.now()

class EmployeeEngagementData:
    """Main data management class for IGNITE project"""
    
    def __init__(self):
        self.employees = []
        self.survey_responses = []
        self.engagement_metrics = []
        
    def generate_sample_data(self, num_employees=100):
        """Generate sample employee data for demonstration"""
        departments = ['Engineering', 'Sales', 'Marketing', 'HR', 'Finance', 'Operations']
        work_arrangements = ['hybrid', 'remote', 'in-office']
        levels = ['junior', 'mid', 'senior', 'leadership']
        
        # Generate employees
        for i in range(num_employees):
            employee = Employee(
                employee_id=f"EMP{i:04d}",
                name=f"Employee {i+1}",
                department=np.random.choice(departments),
                role=f"Role {i+1}",
                hire_date=datetime.now() - timedelta(days=np.random.randint(30, 1825)),
                work_arrangement=np.random.choice(work_arrangements),
                level=np.random.choice(levels)
            )
            self.employees.append(employee)
            
        # Generate survey responses
        survey_questions = {
            'job_satisfaction': np.random.randint(1, 11, num_employees),
            'work_life_balance': np.random.randint(1, 11, num_employees),
            'career_development': np.random.randint(1, 11, num_employees),
            'management_support': np.random.randint(1, 11, num_employees),
            'company_culture': np.random.randint(1, 11, num_employees),
            'compensation_satisfaction': np.random.randint(1, 11, num_employees)
        }
        
        for i, employee in enumerate(self.employees):
            responses = {key: int(values[i]) for key, values in survey_questions.items()}
            survey_response = SurveyResponse(
                response_id=f"RESP{i:04d}",
                employee_id=employee.employee_id,
                survey_type="custom_satisfaction",
                responses=responses,
                sentiment_score=np.random.uniform(0.2, 0.9)
            )
            self.survey_responses.append(survey_response)
            
        # Generate engagement metrics
        for employee in self.employees:
            metrics = EngagementMetrics(
                employee_id=employee.employee_id,
                enps_score=np.random.randint(-100, 101),
                engagement_score=np.random.uniform(1, 10),
                satisfaction_score=np.random.uniform(1, 10),
                turnover_risk=np.random.uniform(0, 1),
                department=employee.department
            )
            self.engagement_metrics.append(metrics)
            
        print(f"Generated sample data for {num_employees} employees")
        return self
    
    def get_employees_df(self):
        """Convert employees to DataFrame"""
        return pd.DataFrame([
            {
                'employee_id': emp.employee_id,
                'name': emp.name,
                'department': emp.department,
                'role': emp.role,
                'hire_date': emp.hire_date,
                'work_arrangement': emp.work_arrangement,
                'level': emp.level,
                'tenure_days': (datetime.now() - emp.hire_date).days
            }
            for emp in self.employees
        ])
    
    def get_survey_responses_df(self):
        """Convert survey responses to DataFrame"""
        data = []
        for response in self.survey_responses:
            row = {
                'response_id': response.response_id,
                'employee_id': response.employee_id,
                'survey_type': response.survey_type,
                'sentiment_score': response.sentiment_score,
                'timestamp': response.timestamp
            }
            row.update(response.responses)
            data.append(row)
        return pd.DataFrame(data)
    
    def get_engagement_metrics_df(self):
        """Convert engagement metrics to DataFrame"""
        return pd.DataFrame([
            {
                'employee_id': metrics.employee_id,
                'enps_score': metrics.enps_score,
                'engagement_score': metrics.engagement_score,
                'satisfaction_score': metrics.satisfaction_score,
                'turnover_risk': metrics.turnover_risk,
                'department': metrics.department,
                'last_updated': metrics.last_updated
            }
            for metrics in self.engagement_metrics
        ])

# Initialize and generate sample data
if __name__ == "__main__":
    ignite_data = EmployeeEngagementData()
    ignite_data.generate_sample_data(100)
    
    print("Sample Employee Data:")
    print(ignite_data.get_employees_df().head())
    print("\nSample Survey Responses:")
    print(ignite_data.get_survey_responses_df().head())
    print("\nSample Engagement Metrics:")
    print(ignite_data.get_engagement_metrics_df().head())
