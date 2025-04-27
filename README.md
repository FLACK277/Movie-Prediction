# Movie Rating-Prediction

A machine learning system that predicts movie ratings based on features like genre, director, actors, and other metadata.

## Overview

This application uses machine learning algorithms to predict movie ratings on a 1-10 scale. It includes data preprocessing, feature engineering, model training and evaluation, and both graphical and command-line interfaces for making predictions.

## Features

- **Data Processing**: Handles missing values, converts data types, and extracts key information from raw movie data
- **Feature Engineering**: Creates valuable derived features like director success metrics, actor success metrics, and genre popularity
- **Model Training**: Trains and compares multiple regression models including:
  - Random Forest
  - Gradient Boosting
  - Linear Regression
- **Hyperparameter Tuning**: Optimizes model parameters for better performance
- **Interactive Interfaces**:
  - GUI for easy use
  - Command-line interface for programmatic access
- **Visualization**: Creates insightful charts showing model performance and feature importance
- **Persistence**: Save and load trained models

## Installation

1. Clone this repository or download the code
2. Install the required dependencies:
   ```bash
   pip install pandas numpy matplotlib seaborn scikit-learn
   ```
3. Ensure you have tkinter installed for GUI support (included with most Python installations)

## Usage

### Running the application

```bash
python movie_rating_predictor.py
```

### Data Format

The program expects a CSV file with the following columns:
- Name: Movie title
- Year: Release year
- Duration: Length in minutes
- Genre: Movie genre(s), comma separated
- Rating: IMDb or similar rating (the target variable)
- Votes: Number of votes/ratings
- Director: Movie director
- Actor 1, Actor 2, Actor 3: Lead actors/actresses

If no data file is provided, the program will generate a small sample dataset for testing.

### Using the GUI

1. Enter movie details in the provided fields
2. Click "Predict Rating" to get a prediction
3. Use "Reset" to clear all fields
4. "Load Sample Movie" provides example data

### Using the Console Interface

Follow the prompts to enter movie information when prompted.

## How It Works

1. **Data Loading and Preprocessing**:
   - Loads movie data from CSV
   - Handles missing values
   - Converts data types
   - Performs basic data cleaning

2. **Feature Engineering**:
   - Extracts primary genre from genre lists
   - Creates decade features from years
   - Calculates director and actor success metrics
   - Categorizes duration into meaningful groups
   - Transforms vote counts to handle skewness

3. **Model Training**:
   - Splits data into training and test sets
   - Preprocesses numerical and categorical features
   - Trains multiple regression models
   - Evaluates performance using RMSE, MAE, and R²
   - Selects the best performing model

4. **Hyperparameter Tuning**:
   - Uses grid search to find optimal parameters
   - Cross-validates models to ensure robustness

5. **Visualization**:
   - Shows feature importance
   - Displays actual vs. predicted ratings
   - Analyzes error distribution

6. **Prediction Interface**:
   - Takes new movie information
   - Preprocesses input to match training data
   - Returns predicted rating with interpretation

## Files

- `movie_rating_predictor.py`: Main application code
- `movie_rating_model.pkl`: Saved model file (created after training)
- `feature_importance.png`: Feature importance visualization
- `actual_vs_predicted.png`: Comparison of actual vs. predicted ratings
- `error_distribution.png`: Distribution of prediction errors
- `error_vs_predicted.png`: Error analysis visualization


### Adding New Features

To add new features to the model:
1. Modify the `engineer_features()` function to create your new features
2. Update the `estimate_movie_rating()` function to handle these features for new predictions

### Training on Different Data

The system can be adapted to different datasets by:
1. Ensuring your data has similar columns (or modify the code to handle different columns)
2. Adjusting the preprocessing steps as needed for your specific data

## Troubleshooting

- **Missing Data Errors**: Ensure your CSV file has all required columns
- **GUI Not Working**: Check if tkinter is installed correctly
- **Poor Predictions**: Try providing more data or adjusting the feature engineering

## License

This project is available under the MIT License.

## Acknowledgments

This project uses scikit-learn for machine learning algorithms and tkinter for GUI components.
