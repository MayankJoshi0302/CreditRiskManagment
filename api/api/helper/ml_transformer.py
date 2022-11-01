from sklearn.base import BaseEstimator, TransformerMixin


class CRMTransformer(BaseEstimator, TransformerMixin):
    def __init__(self):
        pass

    def fit(self, X, y=None):
        return self

    def house_own(self, House_Ownership):
        if House_Ownership == 'Own house':
            House_Ownership = 'Own House'
        return House_Ownership

    def Age_group(self, age):
        intervals = [1, 25, 30, 35, 40, 45, 100]
        for i in range(len(intervals) - 1):
            if age > intervals[i] and age <= intervals[i + 1]:
                age_grp = str(intervals[i]) + "-" + str(intervals[i + 1])
        return age_grp

    def occcupation_grp(self, occupation):
        occupation_cat = {'Category1': ['Students', 'Retired', 'Housewives'],
                          'Category2': ['Business In Trade sector', 'Share and Stock Broker'],
                          'Category3': ['Journalists', 'Artist/Writer Etc'],
                          'Category4': ['Artisan/Craftsman', 'Migrant Laborers'],
                          'Category5': ['Industrialist', 'Business In Service sector'],
                          'Category6': ['Legal Profession'], 'Category7': ['Medical Profession'],
                          'Category8': ['Engineering/Architect/Technical/Consultant', 'CA/ICWA/Taxation/Finance'],
                          'Category9': ['Services In Defence Establishment', 'Central Govt Services',
                                        'Services In Public Sector Undertaking', 'State Govt Services',
                                        'Services In Private Establishment'],
                          'Category10': ['Other Professionals', 'Others']}

        for cat in occupation_cat:
            for c in (occupation_cat[cat]):
                if occupation in c:
                    occ_grp = cat
                    return occ_grp

    def income_grp(self, income):
        intervals = [0, 20000, 40000, 60000, 80000, 100000, 1000000]
        for i in range(len(intervals) - 1):
            if income > intervals[i] and income <= intervals[i + 1]:
                inc_grp = str(intervals[i] + 1) + "-" + str(intervals[i + 1])
                return inc_grp

    def emi_grp(self, emi):
        emi_intervals = [0, 4000, 8000, 12000, 16000, 20000, 282917]
        for i in range(len(emi_intervals) - 1):
            if emi > emi_intervals[i] and emi <= emi_intervals[i + 1]:
                emi_grp = str(emi_intervals[i] + 1) + "-" + str(emi_intervals[i + 1])
                return emi_grp

    def transform(self, X, y=None):
        df = X.copy()
        for col in X.columns:  # iterate though the columns we want to encode
            fillna_value = df[col].mode()[0]
            df[col].fillna(fillna_value, inplace=True)

        df['HouseOwnership'] = df['HouseOwnership'].apply(lambda x: x.replace('Own house', 'Own House'))
        df['NetMonthlyIncomeGroup'] = df['NetMonthlyIncome'].apply(self.income_grp)
        df['AgeGroup'] = df['Age'].apply(self.Age_group)
        df['OccupationCategories'] = df['Occupation'].apply(self.occcupation_grp)

        df = df.drop(['NetMonthlyIncome', 'Age', 'Occupation'], axis=1)
        # one_hot_encoded_data = pd.get_dummies(df, columns = ['House Ownership', 'Qualification','Employment Type', 'No of Dependents',
        # 'Age_Group','NetMonthlyIncome_grp'])
        # one_hot_encoded_data.drop([ 'Repayment Type','EMI_grp'],inplace=True,axis=1)
        # one_hot_encoded_data.drop([ 'Repayment Type'],inplace=True,axis=1)
        # print("Len of one_hot_encoded_data: ",len(one_hot_encoded_data))
        # print(one_hot_encoded_data.head())
        # print("Len of y: ",len(y))
        return df