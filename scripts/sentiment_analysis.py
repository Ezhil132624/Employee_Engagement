import pandas as pd
import numpy as np
from textblob import TextBlob
import re
from collections import Counter
from typing import List, Dict, Tuple

class SentimentAnalyzer:
    """AI-driven sentiment analysis for employee feedback"""
    
    def __init__(self):
        self.positive_keywords = [
            'excellent', 'great', 'amazing', 'fantastic', 'wonderful', 'outstanding',
            'satisfied', 'happy', 'pleased', 'motivated', 'engaged', 'supportive',
            'collaborative', 'innovative', 'growth', 'opportunity', 'balance'
        ]
        
        self.negative_keywords = [
            'terrible', 'awful', 'horrible', 'disappointing', 'frustrated', 'stressed',
            'overwhelmed', 'burnout', 'toxic', 'micromanagement', 'unfair', 'biased',
            'overworked', 'underpaid', 'unsupported', 'disconnected', 'demotivated'
        ]
        
        self.emotion_categories = {
            'stress': ['stress', 'pressure', 'overwhelmed', 'burnout', 'exhausted'],
            'satisfaction': ['satisfied', 'happy', 'content', 'pleased', 'fulfilled'],
            'growth': ['development', 'learning', 'growth', 'advancement', 'opportunity'],
            'support': ['support', 'help', 'guidance', 'mentorship', 'collaboration'],
            'workload': ['workload', 'busy', 'overworked', 'deadline', 'time'],
            'culture': ['culture', 'environment', 'atmosphere', 'team', 'colleagues']
        }
    
    def analyze_sentiment(self, text: str) -> Dict[str, float]:
        """Analyze sentiment of text using TextBlob and custom keywords"""
        if not text or pd.isna(text):
            return {'polarity': 0.0, 'subjectivity': 0.0, 'compound_score': 0.0}
        
        # Clean text
        cleaned_text = self.clean_text(text)
        
        # TextBlob analysis
        blob = TextBlob(cleaned_text)
        polarity = blob.sentiment.polarity
        subjectivity = blob.sentiment.subjectivity
        
        # Custom keyword analysis
        positive_count = sum(1 for word in self.positive_keywords if word in cleaned_text.lower())
        negative_count = sum(1 for word in self.negative_keywords if word in cleaned_text.lower())
        
        # Calculate compound score
        keyword_score = (positive_count - negative_count) / max(len(cleaned_text.split()), 1)
        compound_score = (polarity + keyword_score) / 2
        
        return {
            'polarity': polarity,
            'subjectivity': subjectivity,
            'compound_score': compound_score,
            'positive_keywords': positive_count,
            'negative_keywords': negative_count
        }
    
    def clean_text(self, text: str) -> str:
        """Clean and preprocess text"""
        if not text:
            return ""
        
        # Convert to lowercase
        text = text.lower()
        
        # Remove special characters but keep spaces
        text = re.sub(r'[^a-zA-Z\s]', '', text)
        
        # Remove extra whitespace
        text = ' '.join(text.split())
        
        return text
    
    def extract_emotions(self, text: str) -> Dict[str, int]:
        """Extract emotion categories from text"""
        if not text or pd.isna(text):
            return {category: 0 for category in self.emotion_categories}
        
        cleaned_text = self.clean_text(text)
        emotion_scores = {}
        
        for emotion, keywords in self.emotion_categories.items():
            score = sum(1 for keyword in keywords if keyword in cleaned_text)
            emotion_scores[emotion] = score
            
        return emotion_scores
    
    def analyze_feedback_batch(self, feedback_list: List[str]) -> pd.DataFrame:
        """Analyze sentiment for a batch of feedback"""
        results = []
        
        for i, feedback in enumerate(feedback_list):
            sentiment = self.analyze_sentiment(feedback)
            emotions = self.extract_emotions(feedback)
            
            result = {
                'feedback_id': i,
                'text': feedback,
                **sentiment,
                **emotions
            }
            results.append(result)
        
        return pd.DataFrame(results)
    
    def generate_insights(self, sentiment_df: pd.DataFrame) -> Dict[str, any]:
        """Generate insights from sentiment analysis results"""
        insights = {
            'overall_sentiment': {
                'avg_polarity': sentiment_df['polarity'].mean(),
                'avg_compound_score': sentiment_df['compound_score'].mean(),
                'positive_feedback_pct': (sentiment_df['compound_score'] > 0.1).mean() * 100,
                'negative_feedback_pct': (sentiment_df['compound_score'] < -0.1).mean() * 100
            },
            'top_concerns': [],
            'top_positives': [],
            'emotion_distribution': {}
        }
        
        # Emotion distribution
        emotion_cols = ['stress', 'satisfaction', 'growth', 'support', 'workload', 'culture']
        for emotion in emotion_cols:
            if emotion in sentiment_df.columns:
                insights['emotion_distribution'][emotion] = sentiment_df[emotion].sum()
        
        # Top concerns (negative sentiment)
        negative_feedback = sentiment_df[sentiment_df['compound_score'] < -0.1]
        if not negative_feedback.empty:
            top_emotions = []
            for emotion in emotion_cols:
                if emotion in negative_feedback.columns:
                    total = negative_feedback[emotion].sum()
                    if total > 0:
                        top_emotions.append((emotion, total))
            
            insights['top_concerns'] = sorted(top_emotions, key=lambda x: x[1], reverse=True)[:3]
        
        # Top positives
        positive_feedback = sentiment_df[sentiment_df['compound_score'] > 0.1]
        if not positive_feedback.empty:
            top_emotions = []
            for emotion in emotion_cols:
                if emotion in positive_feedback.columns:
                    total = positive_feedback[emotion].sum()
                    if total > 0:
                        top_emotions.append((emotion, total))
            
            insights['top_positives'] = sorted(top_emotions, key=lambda x: x[1], reverse=True)[:3]
        
        return insights

# Example usage and testing
if __name__ == "__main__":
    # Sample employee feedback
    sample_feedback = [
        "I love working here! The team is very supportive and I have great opportunities for growth.",
        "The workload is overwhelming and I'm feeling burned out. Management doesn't seem to care.",
        "Good work-life balance and flexible arrangements. Could use more development opportunities.",
        "Toxic work environment with micromanagement. Very stressful and demotivating.",
        "Amazing company culture! Colleagues are collaborative and leadership is supportive.",
        "Underpaid and overworked. No recognition for hard work. Considering leaving.",
        "Excellent learning opportunities and career advancement. Very satisfied with my role.",
        "Too much pressure and unrealistic deadlines. Affecting my mental health.",
        "Great benefits and compensation. Team is fantastic to work with.",
        "Lack of communication from management. Feeling disconnected from company goals."
    ]
    
    # Initialize analyzer
    analyzer = SentimentAnalyzer()
    
    # Analyze feedback
    results = analyzer.analyze_feedback_batch(sample_feedback)
    print("Sentiment Analysis Results:")
    print(results[['compound_score', 'stress', 'satisfaction', 'support']].head())
    
    # Generate insights
    insights = analyzer.generate_insights(results)
    print("\nSentiment Insights:")
    print(f"Average Sentiment Score: {insights['overall_sentiment']['avg_compound_score']:.3f}")
    print(f"Positive Feedback: {insights['overall_sentiment']['positive_feedback_pct']:.1f}%")
    print(f"Negative Feedback: {insights['overall_sentiment']['negative_feedback_pct']:.1f}%")
    print(f"Top Concerns: {insights['top_concerns']}")
    print(f"Top Positives: {insights['top_positives']}")
