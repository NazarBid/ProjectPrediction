from flask import Flask, request, jsonify, render_template
import joblib
import numpy as np
import pandas as pd

app = Flask(__name__)
model_usa = joblib.load('stacking_pipeline (1).pkl')
model_india = joblib.load('preprocessed_model.pkl')

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/settings')
def settings():
    return render_template('settings.html')

@app.route('/predict', methods=['POST'])
def predict():
    try:
        country = request.form.get('country', 'USA')  # За замовчуванням "USA"

        if country == 'USA':
            # Дані для моделі США
            age = int(request.form['age'])
            sex = request.form['sex'] == 'male'
            weight = float(request.form['weightUSA'])
            height = float(request.form['heightUSA']) / 100
            children = int(request.form['children'])
            smoker = request.form['smoker']
            region_encoded = request.form['region']

            bmi = weight / (height ** 2)

            input_features = np.array([[age, sex, bmi, children, smoker, region_encoded]])
            columns = ['age', 'sex', 'bmi', 'children', 'smoker', 'region']
            input_df = pd.DataFrame(input_features, columns=columns)
            prediction = model_usa.predict(input_df)[0]

        elif country == 'India':
            # Дані для моделі Індії
            Age = int(request.form['ageIndia']) #int
            Diabetes = 1 if request.form['DiabetesIndia'] == 'yes' else 0 #так або ні
            BloodPressureProblems = 1 if request.form['BloodPressureIndia'] == 'yes' else 0 #так або ні
            AnyTransplants = 1 if request.form['AnyTransplantsIndia'] == 'yes' else 0 #так або ні
            AnyChronicDiseases = 1 if request.form['AnyChronicDiseasesIndia'] == 'yes' else 0 #так або ні
            KnownAllergies = 1 if request.form['KnownAllergiesIndia'] == 'yes' else 0 #так або ні
            HistoryOfCancerInFamily = 1 if request.form['HistoryOfCancerInFamilyIndia'] == 'yes' else 0 #так або ні
            NumberOfMajorSurgeries = int(request.form['NumberOfMajorSurgeriesIndia']) #int
            weight = float(request.form['weightIndia'])
            height = float(request.form['heightIndia']) / 100

            bmi = weight / (height ** 2)

            input_features = np.array([[Age, Diabetes,BloodPressureProblems, AnyTransplants, AnyChronicDiseases, KnownAllergies, HistoryOfCancerInFamily, NumberOfMajorSurgeries, bmi]])
            columns = ['Age', 'Diabetes', 'BloodPressureProblems', 'AnyTransplants', 'AnyChronicDiseases', 'KnownAllergies', 'HistoryOfCancerInFamily', 'NumberOfMajorSurgeries', 'BMI']
            input_df = pd.DataFrame(input_features, columns=columns)
            prediction = model_india.predict(input_df)[0]

        else:
            return render_template('index.html', prediction_text='Error: Invalid country selection.')

        return render_template('index.html', prediction_text=f'{prediction:.2f}')
    except Exception as e:
        return render_template('index.html', prediction_text=f'Error: {str(e)}')

if __name__ == "__main__":
    app.run(debug=True)
    # app.run(debug=False)
