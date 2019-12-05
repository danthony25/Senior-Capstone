from sklearn.cluster import KMeans
import pandas as pd
import numpy as np
import math
from statistics import mean
import matplotlib.pyplot as plt
from datetime import datetime
from scipy.optimize import curve_fit
import statsmodels.api as sm
from scipy import stats
import time
from matplotlib import cm

def cause_rating(df):
    
    # bars = []
    # for bar in df['Cause'].unique():
    #     bars.append(bar)
    bars = df['Category'].unique()
    avg_scores = []
    for bar in bars:
        scores = 0
        total = 0

        for i in range(len(df)):
            if bar == df.loc[i, 'Category']:
                total += 1
                scores += df.loc[i,'Rating']
        
        avg_scores.append(scores/total)

    plt.style.use('seaborn-pastel')

    # bars = ['Non-Medical Science\n& Technology Research', 'United Ways', 'Medical Research', 'Libraries, Historical\n Societies and\n Landmark Preservation', 'Youth Development\n Shelter, and Crisis Services', 'Social Services', 'Animal Rights, Welfare\n and Services', 'Multipurpose Human\n Service Organizations', 'Environmental Protection\n and Conservation', "Children's\n and\n Family Services", 'Museums', 'Housing and\n Neighborhood Development', 'Community\n Foundations', 'Homeless\n Services', 'Botanical Gardens, Parks\n and Nature Centers', 'Patient\n and\n Family Support', 'Scholarship\n and\n Financial Support', 'Development\n and\n Relief Services',
    #     'International Peace\n Security, and Affairs', 'Public Broadcasting\n and Media', 'Education Policy\n and Reform', 'Jewish Federations', 'Diseases, Disorders\n and Disciplines', 'Performing Arts', 'Special Education', 'Advocacy\n and\n Education', 'Food Banks, Food Pantries\n and Food Distribution', 'Treatment\n and\n Prevention Services', 'Social and Public\n Policy Research', 'Youth Education\n Programs and Services', 'Religious Activities', 'Religious Media\n and Broadcasting', 'Adult Education\n Programs and Services', 'Wildlife Conservation', 'Zoos\n and\n Aquariums', 'Early Childhood\n Programs and Services', 'Humanitarian\n Relief Supplies']


    fig, ax = plt.subplots()
    x = [i for i in range (len(bars))]
    color = cm.viridis(np.linspace(.4, .8, 11))
    plt.bar(x, avg_scores, align='center', color= color)
    plt.xticks(x, bars, rotation=45)
    for i, v in enumerate(avg_scores):
        plt.text(x[i] - 0.15, v + 0.01, str(round(v,2)), fontsize = 18)

    
    
    plt.ylabel('Rating out of 5', fontsize=20)
    plt.yticks(fontsize=18)
    plt.xticks(fontsize=14)
    plt.xlabel('Category', fontsize=24)

    plt.title('Charity Ratings by Category', fontsize=30)

    # plt.tight_layout()
    fig.subplots_adjust(bottom=0.2)
    plt.show()
def cause_financial(df):

    bars = df['Category'].unique()
    avg_revenue = []
    for bar in bars:
        scores = 0
        total = 0
        dough = 0

        for i in range(len(df)):
            if bar == df.loc[i, 'Category']:
                total += 1
                scores += df.loc[i, 'Program Expense Ratio']
                dough += df.loc[i, 'Revenue']
        # print(bar)
        # print(dough)
        # print(total)
        # print(dough/total)
        avg_revenue.append(scores/total)

    bars = ['Research\n and\n Public Policy', 'Community\n Development', 'Health','Arts, Culture\n Humanities', 'Human\n Services' ,'Animals', 'Environment','Education', 'International', 'Human \nand\n Civil Rights', 'Religion']
    plt.style.use('seaborn-pastel')
    # converted = []
    # for rev in avg_revenue:
    #     converted.append('${:,.2f}'.format(float(rev)))
    fig, ax = plt.subplots()
    x = [i for i in range(len(bars))]
    color = cm.viridis(np.linspace(.4, .8, 11))
    plt.bar(x, avg_revenue, align='center', color=color)
    plt.xticks(x, bars)
    for i, v in enumerate(avg_revenue):
        plt.text(x[i] - 0.2, v + .01 , str(round(float(v),2)), fontsize=36)

    plt.ylabel('Expense Ratio', fontsize=48)
    plt.yticks(fontsize=40)
    plt.xticks(fontsize=40, rotation = 'vertical')
    plt.xlabel('Category', fontsize=40)

    plt.title('Program Expense Ratio by Category', fontsize=48)

    # plt.tight_layout()
    fig.subplots_adjust(bottom=0.2)
    plt.show()

def main():
    df = pd.read_csv('charities_updated_2.csv')
    cause_financial(df)
    plt.show()

main()



