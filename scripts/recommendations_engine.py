import pandas as pd
import numpy as np
from typing import Dict, List, Tuple
from datetime import datetime

class EngagementRecommendationsEngine:
    """AI-powered recommendations engine for employee engagement initiatives"""
    
    def __init__(self):
        self.intervention_library = {
            'low_job_satisfaction': [
                {
                    'intervention': 'Role Redesign Workshop',
                    'description': 'Collaborate with employee to redesign role for better fit',
                    'impact_score': 8.5,
                    'effort_level': 'Medium',
                    'timeline': '2-4 weeks'
                },
                {
                    'intervention': 'Skills Development Program',
                    'description': 'Provide training to enhance job-relevant skills',
                    'impact_score': 7.8,
                    'effort_level': 'Medium',
                    'timeline': '4-8 weeks'
                },
                {
                    'intervention': 'Career Pathing Session',
                    'description': 'Define clear career progression opportunities',
                    'impact_score': 8.2,
                    'effort_level': 'Low',
                    'timeline': '1-2 weeks'
                }
            ],
            'poor_work_life_balance': [
                {
                    'intervention': 'Flexible Work Arrangements',
                    'description': 'Implement flexible hours or remote work options',
                    'impact_score': 9.1,
                    'effort_level': 'Low',
                    'timeline': '1 week'
                },
                {
                    'intervention': 'Workload Assessment',
                    'description': 'Review and redistribute workload if necessary',
                    'impact_score': 8.7,
                    'effort_level': 'Medium',
                    'timeline': '2-3 weeks'
                },
                {
                    'intervention': 'Time Management Training',
                    'description': 'Provide training on productivity and time management',
                    'impact_score': 7.3,
                    'effort_level': 'Low',
                    'timeline': '1-2 weeks'
                }
            ],
            'limited_career_development': [
                {
                    'intervention': 'Mentorship Program',
                    'description': 'Pair with senior mentor for guidance and development',
                    'impact_score': 8.9,
                    'effort_level': 'Medium',
                    'timeline': 'Ongoing'
                },
                {
                    'intervention': 'Learning & Development Budget',
                    'description': 'Allocate budget for courses, conferences, certifications',
                    'impact_score': 8.4,
                    'effort_level': 'Low',
                    'timeline': '1 week'
                },
                {
                    'intervention': 'Cross-functional Projects',
                    'description': 'Assign to projects outside current role for skill building',
                    'impact_score': 7.9,
                    'effort_level': 'Medium',
                    'timeline': '2-4 weeks'
                }
            ],
            'weak_management_support': [
                {
                    'intervention': 'Manager Coaching',
                    'description': 'Provide leadership coaching for direct manager',
                    'impact_score': 9.2,
                    'effort_level': 'High',
                    'timeline': '4-8 weeks'
                },
                {
                    'intervention': 'Regular 1:1 Meetings',
                    'description': 'Establish structured weekly one-on-one meetings',
                    'impact_score': 8.1,
                    'effort_level': 'Low',
                    'timeline': '1 week'
                },
                {
                    'intervention': 'Team Building Activities',
                    'description': 'Organize team building to improve relationships',
                    'impact_score': 7.5,
                    'effort_level': 'Medium',
                    'timeline': '2-3 weeks'
                }
            ],
            'high_turnover_risk': [
                {
                    'intervention': 'Stay Interview',
                    'description': 'Conduct detailed interview to understand concerns',
                    'impact_score': 8.8,
                    'effort_level': 'Low',
                    'timeline': '1 week'
                },
                {
                    'intervention': 'Retention Bonus',
                    'description': 'Offer financial incentive to stay',
                    'impact_score': 7.2,
                    'effort_level': 'Low',
                    'timeline': '1 week'
                },
                {
                    'intervention': 'Role Enhancement',
                    'description': 'Add responsibilities or change role to increase engagement',
                    'impact_score': 8.6,
                    'effort_level': 'Medium',
                    'timeline': '2-4 weeks'
                }
            ],
            'low_engagement': [
                {
                    'intervention': 'Recognition Program',
                    'description': 'Implement peer and manager recognition system',
                    'impact_score': 8.3,
                    'effort_level': 'Medium',
                    'timeline': '2-3 weeks'
                },
                {
                    'intervention': 'Autonomy Enhancement',
                    'description': 'Increase decision-making authority and independence',
                    'impact_score': 8.7,
                    'effort_level': 'Low',
                    'timeline': '1 week'
                },
                {
                    'intervention': 'Purpose Alignment Session',
                    'description': 'Connect individual work to company mission and impact',
                    'impact_score': 8.0,
                    'effort_level': 'Low',
                    'timeline': '1-2 weeks'
                }
            ]
        }
        
        self.department_strategies = {
            'Engineering': {
                'focus_areas': ['technical_growth', 'innovation_time', 'code_quality'],
                'specific_interventions': ['Tech Talk Series', 'Innovation Days', 'Code Review Culture']
            },
            'Sales': {
                'focus_areas': ['commission_structure', 'sales_tools', 'territory_management'],
                'specific_interventions': ['Sales Enablement Training', 'CRM Optimization', 'Territory Rebalancing']
            },
            'Marketing': {
                'focus_areas': ['creative_freedom', 'campaign_impact', 'brand_alignment'],
                'specific_interventions': ['Creative Workshops', 'Campaign Analytics Training', 'Brand Ambassador Program']
            },
            'HR': {
                'focus_areas': ['employee_advocacy', 'policy_influence', 'people_development'],
                'specific_interventions': ['HR Business Partner Training', 'Employee Experience Design', 'People Analytics']
            }
        }
    
    def analyze_employee_needs(self, employee_data: pd.Series) -> List[str]:
        """Analyze individual employee needs based on survey data"""
        needs = []
        
        # Check satisfaction scores
        if employee_data.get('job_satisfaction', 10) <= 5:
            needs.append('low_job_satisfaction')
        
        if employee_data.get('work_life_balance', 10) <= 5:
            needs.append('poor_work_life_balance')
        
        if employee_data.get('career_development', 10) <= 5:
            needs.append('limited_career_development')
        
        if employee_data.get('management_support', 10) <= 5:
            needs.append('weak_management_support')
        
        # Check engagement and risk scores
        if employee_data.get('engagement_score', 10) < 6:
            needs.append('low_engagement')
        
        if employee_data.get('turnover_risk', 0) > 0.6:
            needs.append('high_turnover_risk')
        
        return needs
    
    def generate_individual_recommendations(self, employee_data: pd.Series) -> Dict[str, any]:
        """Generate personalized recommendations for an individual employee"""
        
        needs = self.analyze_employee_needs(employee_data)
        recommendations = []
        
        for need in needs:
            if need in self.intervention_library:
                interventions = self.intervention_library[need]
                # Sort by impact score and select top 2
                top_interventions = sorted(interventions, key=lambda x: x['impact_score'], reverse=True)[:2]
                recommendations.extend(top_interventions)
        
        # Add department-specific recommendations
        department = employee_data.get('department', '')
        if department in self.department_strategies:
            dept_strategy = self.department_strategies[department]
            for intervention in dept_strategy['specific_interventions']:
                recommendations.append({
                    'intervention': intervention,
                    'description': f'Department-specific initiative for {department}',
                    'impact_score': 7.5,
                    'effort_level': 'Medium',
                    'timeline': '2-4 weeks',
                    'category': 'department_specific'
                })
        
        # Remove duplicates and sort by impact
        unique_recommendations = []
        seen_interventions = set()
        
        for rec in recommendations:
            if rec['intervention'] not in seen_interventions:
                unique_recommendations.append(rec)
                seen_interventions.add(rec['intervention'])
        
        unique_recommendations = sorted(unique_recommendations, key=lambda x: x['impact_score'], reverse=True)
        
        return {
            'employee_id': employee_data.get('employee_id', ''),
            'employee_name': employee_data.get('name', ''),
            'department': employee_data.get('department', ''),
            'identified_needs': needs,
            'recommendations': unique_recommendations[:5],  # Top 5 recommendations
            'priority_level': self.calculate_priority_level(employee_data),
            'estimated_impact': self.estimate_overall_impact(unique_recommendations[:5])
        }
    
    def calculate_priority_level(self, employee_data: pd.Series) -> str:
        """Calculate priority level for intervention"""
        
        risk_score = employee_data.get('turnover_risk', 0)
        engagement_score = employee_data.get('engagement_score', 10)
        satisfaction_score = employee_data.get('satisfaction_score', 10)
        
        # Calculate composite priority score
        priority_score = (
            risk_score * 0.4 +  # 40% weight on turnover risk
            (10 - engagement_score) / 10 * 0.3 +  # 30% weight on low engagement
            (10 - satisfaction_score) / 10 * 0.3   # 30% weight on low satisfaction
        )
        
        if priority_score > 0.7:
            return 'Critical'
        elif priority_score > 0.5:
            return 'High'
        elif priority_score > 0.3:
            return 'Medium'
        else:
            return 'Low'
    
    def estimate_overall_impact(self, recommendations: List[Dict]) -> float:
        """Estimate overall impact of recommended interventions"""
        if not recommendations:
            return 0.0
        
        # Calculate weighted average impact considering diminishing returns
        total_impact = 0
        weight = 1.0
        
        for rec in recommendations:
            total_impact += rec['impact_score'] * weight
            weight *= 0.8  # Diminishing returns for additional interventions
        
        return min(total_impact, 10.0)  # Cap at 10
    
    def generate_team_recommendations(self, team_data: pd.DataFrame) -> Dict[str, any]:
        """Generate team-level recommendations"""
        
        team_issues = {}
        
        # Identify common issues
        low_satisfaction_pct = (team_data['job_satisfaction'] <= 5).mean() * 100
        poor_balance_pct = (team_data['work_life_balance'] <= 5).mean() * 100
        limited_development_pct = (team_data['career_development'] <= 5).mean() * 100
        weak_management_pct = (team_data['management_support'] <= 5).mean() * 100
        
        team_recommendations = []
        
        # Team-wide interventions based on common issues
        if low_satisfaction_pct > 30:
            team_recommendations.append({
                'intervention': 'Team Role Clarity Workshop',
                'description': 'Address role confusion and job satisfaction across the team',
                'affected_percentage': low_satisfaction_pct,
                'impact_score': 8.5
            })
        
        if poor_balance_pct > 25:
            team_recommendations.append({
                'intervention': 'Team Workload Rebalancing',
                'description': 'Redistribute work and implement team-wide flexible policies',
                'affected_percentage': poor_balance_pct,
                'impact_score': 8.8
            })
        
        if limited_development_pct > 35:
            team_recommendations.append({
                'intervention': 'Team Learning Initiative',
                'description': 'Implement team-wide learning and development program',
                'affected_percentage': limited_development_pct,
                'impact_score': 8.3
            })
        
        if weak_management_pct > 40:
            team_recommendations.append({
                'intervention': 'Leadership Development Program',
                'description': 'Intensive management training for team leaders',
                'affected_percentage': weak_management_pct,
                'impact_score': 9.1
            })
        
        return {
            'team_size': len(team_data),
            'avg_engagement': team_data['engagement_score'].mean(),
            'avg_satisfaction': team_data['satisfaction_score'].mean(),
            'high_risk_count': (team_data['turnover_risk'] > 0.6).sum(),
            'team_recommendations': sorted(team_recommendations, key=lambda x: x['impact_score'], reverse=True),
            'individual_attention_needed': len(team_data[team_data['turnover_risk'] > 0.7])
        }
    
    def create_action_plan(self, recommendations: Dict[str, any]) -> str:
        """Create a detailed action plan"""
        
        action_plan = f"""
EMPLOYEE ENGAGEMENT ACTION PLAN
{'='*50}

Employee: {recommendations['employee_name']}
Department: {recommendations['department']}
Priority Level: {recommendations['priority_level']}
Estimated Impact: {recommendations['estimated_impact']:.1f}/10

IDENTIFIED NEEDS:
{chr(10).join([f"• {need.replace('_', ' ').title()}" for need in recommendations['identified_needs']])}

RECOMMENDED ACTIONS:
"""
        
        for i, rec in enumerate(recommendations['recommendations'], 1):
            action_plan += f"""
{i}. {rec['intervention']}
   Description: {rec['description']}
   Impact Score: {rec['impact_score']}/10
   Effort Level: {rec['effort_level']}
   Timeline: {rec['timeline']}
   
"""
        
        action_plan += """
IMPLEMENTATION TIMELINE:
Week 1: Conduct stay interview and implement quick wins
Week 2-3: Begin medium-effort interventions
Week 4-8: Execute high-impact, longer-term initiatives
Week 12: Review progress and adjust plan

SUCCESS METRICS:
• Improvement in relevant survey scores
• Reduction in turnover risk score
• Increase in engagement metrics
• Employee feedback on interventions
"""
        
        return action_plan

# Example usage
if __name__ == "__main__":
    # Sample employee data
    sample_employee = pd.Series({
        'employee_id': 'EMP0001',
        'name': 'John Doe',
        'department': 'Engineering',
        'job_satisfaction': 4,
        'work_life_balance': 3,
        'career_development': 5,
        'management_support': 4,
        'engagement_score': 5.2,
        'satisfaction_score': 4.1,
        'turnover_risk': 0.75
    })
    
    # Initialize recommendations engine
    engine = EngagementRecommendationsEngine()
    
    # Generate individual recommendations
    recommendations = engine.generate_individual_recommendations(sample_employee)
    
    print("INDIVIDUAL RECOMMENDATIONS:")
    print(f"Employee: {recommendations['employee_name']}")
    print(f"Priority: {recommendations['priority_level']}")
    print(f"Estimated Impact: {recommendations['estimated_impact']:.1f}/10")
    print("\nTop Recommendations:")
    
    for i, rec in enumerate(recommendations['recommendations'][:3], 1):
        print(f"{i}. {rec['intervention']} (Impact: {rec['impact_score']}/10)")
        print(f"   {rec['description']}")
        print(f"   Timeline: {rec['timeline']}, Effort: {rec['effort_level']}\n")
    
    # Generate action plan
    action_plan = engine.create_action_plan(recommendations)
    print("\n" + action_plan)
