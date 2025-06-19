import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime, timedelta
import plotly.graph_objects as go
import plotly.express as px
from plotly.subplots import make_subplots
import warnings
warnings.filterwarnings('ignore')

class EngagementDashboard:
    """Analytics dashboard for IGNITE project"""
    
    def __init__(self):
        self.data = None
        self.metrics = {}
        
    def load_data(self, employees_df, survey_df, metrics_df, sentiment_df=None):
        """Load all data sources"""
        # Merge all data
        self.data = employees_df.merge(survey_df, on='employee_id', how='left')
        self.data = self.data.merge(metrics_df, on='employee_id', how='left')
        
        if sentiment_df is not None:
            self.data = self.data.merge(sentiment_df, left_on='employee_id', 
                                      right_on='feedback_id', how='left')
        
        self.calculate_kpis()
        
    def calculate_kpis(self):
        """Calculate key performance indicators"""
        if self.data is None:
            return
            
        self.metrics = {
            'total_employees': len(self.data),
            'avg_engagement': self.data['engagement_score'].mean(),
            'avg_satisfaction': self.data['satisfaction_score'].mean(),
            'avg_enps': self.data['enps_score'].mean(),
            'high_risk_employees': (self.data['turnover_risk'] > 0.6).sum(),
            'engagement_by_dept': self.data.groupby('department')['engagement_score'].mean().to_dict(),
            'satisfaction_by_arrangement': self.data.groupby('work_arrangement')['satisfaction_score'].mean().to_dict(),
            'retention_risk': (self.data['turnover_risk'] > 0.6).mean() * 100
        }
        
    def create_engagement_heatmap(self):
        """Create engagement heatmap by department and work arrangement"""
        if self.data is None:
            return None
            
        # Create pivot table
        heatmap_data = self.data.pivot_table(
            values='engagement_score', 
            index='department', 
            columns='work_arrangement', 
            aggfunc='mean'
        )
        
        # Create heatmap
        fig = go.Figure(data=go.Heatmap(
            z=heatmap_data.values,
            x=heatmap_data.columns,
            y=heatmap_data.index,
            colorscale='RdYlGn',
            text=np.round(heatmap_data.values, 2),
            texttemplate="%{text}",
            textfont={"size": 12},
            colorbar=dict(title="Engagement Score")
        ))
        
        fig.update_layout(
            title="Employee Engagement Heatmap by Department and Work Arrangement",
            xaxis_title="Work Arrangement",
            yaxis_title="Department",
            height=500
        )
        
        return fig
    
    def create_satisfaction_trends(self):
        """Create satisfaction trends visualization"""
        if self.data is None:
            return None
            
        # Calculate satisfaction metrics
        satisfaction_metrics = ['job_satisfaction', 'work_life_balance', 'career_development',
                              'management_support', 'company_culture', 'compensation_satisfaction']
        
        avg_scores = []
        for metric in satisfaction_metrics:
            if metric in self.data.columns:
                avg_scores.append(self.data[metric].mean())
            else:
                avg_scores.append(0)
        
        # Create radar chart
        fig = go.Figure()
        
        fig.add_trace(go.Scatterpolar(
            r=avg_scores,
            theta=satisfaction_metrics,
            fill='toself',
            name='Average Scores',
            line_color='rgb(0,100,200)'
        ))
        
        fig.update_layout(
            polar=dict(
                radialaxis=dict(
                    visible=True,
                    range=[0, 10]
                )),
            showlegend=True,
            title="Employee Satisfaction Radar Chart",
            height=500
        )
        
        return fig
    
    def create_turnover_risk_analysis(self):
        """Create turnover risk analysis"""
        if self.data is None or 'turnover_risk' not in self.data.columns:
            return None
            
        # Risk categories
        self.data['risk_category'] = pd.cut(self.data['turnover_risk'], 
                                          bins=[0, 0.3, 0.6, 1.0], 
                                          labels=['Low', 'Medium', 'High'])
        
        # Create subplots
        fig = make_subplots(
            rows=2, cols=2,
            subplot_titles=('Risk Distribution', 'Risk by Department', 
                          'Risk by Work Arrangement', 'Risk vs Engagement'),
            specs=[[{"type": "pie"}, {"type": "bar"}],
                   [{"type": "bar"}, {"type": "scatter"}]]
        )
        
        # Risk distribution pie chart
        risk_counts = self.data['risk_category'].value_counts()
        fig.add_trace(
            go.Pie(labels=risk_counts.index, values=risk_counts.values, name="Risk Distribution"),
            row=1, col=1
        )
        
        # Risk by department
        dept_risk = self.data.groupby('department')['turnover_risk'].mean().sort_values(ascending=False)
        fig.add_trace(
            go.Bar(x=dept_risk.index, y=dept_risk.values, name="Avg Risk by Dept"),
            row=1, col=2
        )
        
        # Risk by work arrangement
        arrangement_risk = self.data.groupby('work_arrangement')['turnover_risk'].mean()
        fig.add_trace(
            go.Bar(x=arrangement_risk.index, y=arrangement_risk.values, name="Risk by Arrangement"),
            row=2, col=1
        )
        
        # Risk vs Engagement scatter
        fig.add_trace(
            go.Scatter(x=self.data['engagement_score'], y=self.data['turnover_risk'],
                      mode='markers', name="Risk vs Engagement"),
            row=2, col=2
        )
        
        fig.update_layout(height=800, title_text="Turnover Risk Analysis Dashboard")
        return fig
    
    def create_kpi_summary(self):
        """Create KPI summary dashboard"""
        if not self.metrics:
            return None
            
        # Create KPI cards
        fig = make_subplots(
            rows=2, cols=3,
            subplot_titles=('Engagement Score', 'Satisfaction Score', 'eNPS Score',
                          'High Risk Employees', 'Retention Risk %', 'Total Employees'),
            specs=[[{"type": "indicator"}, {"type": "indicator"}, {"type": "indicator"}],
                   [{"type": "indicator"}, {"type": "indicator"}, {"type": "indicator"}]]
        )
        
        # Engagement Score
        fig.add_trace(go.Indicator(
            mode="gauge+number+delta",
            value=self.metrics['avg_engagement'],
            domain={'x': [0, 1], 'y': [0, 1]},
            title={'text': "Engagement"},
            gauge={'axis': {'range': [None, 10]},
                   'bar': {'color': "darkblue"},
                   'steps': [{'range': [0, 5], 'color': "lightgray"},
                            {'range': [5, 8], 'color': "yellow"},
                            {'range': [8, 10], 'color': "green"}],
                   'threshold': {'line': {'color': "red", 'width': 4},
                               'thickness': 0.75, 'value': 8}}
        ), row=1, col=1)
        
        # Satisfaction Score
        fig.add_trace(go.Indicator(
            mode="gauge+number",
            value=self.metrics['avg_satisfaction'],
            title={'text': "Satisfaction"},
            gauge={'axis': {'range': [None, 10]},
                   'bar': {'color': "green"}}
        ), row=1, col=2)
        
        # eNPS Score
        fig.add_trace(go.Indicator(
            mode="gauge+number",
            value=self.metrics['avg_enps'],
            title={'text': "eNPS"},
            gauge={'axis': {'range': [-100, 100]},
                   'bar': {'color': "orange"}}
        ), row=1, col=3)
        
        # High Risk Employees
        fig.add_trace(go.Indicator(
            mode="number",
            value=self.metrics['high_risk_employees'],
            title={'text': "High Risk Employees"}
        ), row=2, col=1)
        
        # Retention Risk
        fig.add_trace(go.Indicator(
            mode="number",
            value=self.metrics['retention_risk'],
            title={'text': "Retention Risk %"},
            number={'suffix': "%"}
        ), row=2, col=2)
        
        # Total Employees
        fig.add_trace(go.Indicator(
            mode="number",
            value=self.metrics['total_employees'],
            title={'text': "Total Employees"}
        ), row=2, col=3)
        
        fig.update_layout(height=600, title_text="IGNITE Project KPI Dashboard")
        return fig
    
    def generate_insights_report(self):
        """Generate insights and recommendations"""
        if self.data is None:
            return "No data available for analysis"
        
        insights = []
        
        # Overall engagement insights
        avg_engagement = self.metrics['avg_engagement']
        if avg_engagement < 6:
            insights.append("🔴 CRITICAL: Overall engagement is below 6.0. Immediate action required.")
        elif avg_engagement < 7:
            insights.append("🟡 WARNING: Engagement levels are moderate. Focus on improvement initiatives.")
        else:
            insights.append("🟢 GOOD: Engagement levels are healthy.")
        
        # Department insights
        dept_engagement = self.metrics['engagement_by_dept']
        lowest_dept = min(dept_engagement, key=dept_engagement.get)
        highest_dept = max(dept_engagement, key=dept_engagement.get)
        
        insights.append(f"📊 {lowest_dept} has the lowest engagement ({dept_engagement[lowest_dept]:.2f})")
        insights.append(f"🏆 {highest_dept} has the highest engagement ({dept_engagement[highest_dept]:.2f})")
        
        # Work arrangement insights
        arrangement_satisfaction = self.metrics['satisfaction_by_arrangement']
        best_arrangement = max(arrangement_satisfaction, key=arrangement_satisfaction.get)
        insights.append(f"💼 {best_arrangement} workers report highest satisfaction ({arrangement_satisfaction[best_arrangement]:.2f})")
        
        # Risk insights
        high_risk_pct = (self.metrics['high_risk_employees'] / self.metrics['total_employees']) * 100
        if high_risk_pct > 20:
            insights.append(f"⚠️ HIGH ALERT: {high_risk_pct:.1f}% of employees are at high turnover risk")
        elif high_risk_pct > 10:
            insights.append(f"⚠️ MODERATE RISK: {high_risk_pct:.1f}% of employees are at high turnover risk")
        
        # Recommendations
        recommendations = [
            "🎯 Focus on departments with lowest engagement scores",
            "💬 Conduct focus groups with high-risk employees",
            "📈 Implement targeted retention strategies",
            "🏅 Expand successful practices from high-performing departments",
            "📊 Increase frequency of pulse surveys for early detection"
        ]
        
        report = "IGNITE PROJECT INSIGHTS REPORT\n" + "="*50 + "\n\n"
        report += "KEY INSIGHTS:\n" + "\n".join(insights) + "\n\n"
        report += "RECOMMENDATIONS:\n" + "\n".join(recommendations)
        
        return report
    
    def export_dashboard_data(self, filename="ignite_dashboard_data.csv"):
        """Export dashboard data to CSV"""
        if self.data is not None:
            self.data.to_csv(filename, index=False)
            print(f"Dashboard data exported to {filename}")

# Example usage
if __name__ == "__main__":
    # This would use data from previous scripts
    from data_models import EmployeeEngagementData
    
    # Generate sample data
    ignite_data = EmployeeEngagementData().generate_sample_data(150)
    
    employees_df = ignite_data.get_employees_df()
    survey_df = ignite_data.get_survey_responses_df()
    metrics_df = ignite_data.get_engagement_metrics_df()
    
    # Create dashboard
    dashboard = EngagementDashboard()
    dashboard.load_data(employees_df, survey_df, metrics_df)
    
    # Print insights report
    print(dashboard.generate_insights_report())
    
    # Print KPI summary
    print(f"\nKPI SUMMARY:")
    print(f"Total Employees: {dashboard.metrics['total_employees']}")
    print(f"Average Engagement: {dashboard.metrics['avg_engagement']:.2f}")
    print(f"Average Satisfaction: {dashboard.metrics['avg_satisfaction']:.2f}")
    print(f"High Risk Employees: {dashboard.metrics['high_risk_employees']}")
    print(f"Retention Risk: {dashboard.metrics['retention_risk']:.1f}%")
