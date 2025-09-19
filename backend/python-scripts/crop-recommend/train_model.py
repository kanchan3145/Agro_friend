import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
import joblib

# Load dataset
data = pd.read_csv("Crop_recommendation.csv")

# Features and target
X = data.drop("label", axis=1)  # all columns except crop name
y = data["label"]               # crop name

# Split into train/test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Save trained model
joblib.dump(model, "crop_recommendation_model.joblib")
print("✅ Model saved as crop_recommendation_model.joblib")
