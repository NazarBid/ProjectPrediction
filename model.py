import pandas as pd
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, r2_score
import joblib

# Завантажте дані
data = pd.read_csv('insurance.csv')

# Перевірка наявності стовпців
print(data.columns)

# Перевірка відсутніх значень
print(data.isnull().sum())

# Кодування категоріальних змінних
encoder = LabelEncoder()
data['sex'] = encoder.fit_transform(data['sex'])
data['smoker'] = encoder.fit_transform(data['smoker'])
data['region'] = encoder.fit_transform(data['region'])

# Поділ на X та y
X = data.drop('charges', axis=1)
y = data['charges']

# Розподіл на тренувальну та тестову вибірки
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Навчання моделі
model = RandomForestRegressor(random_state=42)
model.fit(X_train, y_train)

# Оцінка моделі
predictions = model.predict(X_test)
print("Mean Absolute Error:", mean_absolute_error(y_test, predictions))
print("R2 Score:", r2_score(y_test, predictions))

# Збереження моделі
joblib.dump(model, 'insurance_model.pkl')

# # Створення DataFrame
# df = pd.DataFrame(data)
#
# # Виведення унікальних значень для кожного стовпця
# for column in df.columns:
#     unique_values = df[column].unique()
#     print(f"{column}: {unique_values}")
