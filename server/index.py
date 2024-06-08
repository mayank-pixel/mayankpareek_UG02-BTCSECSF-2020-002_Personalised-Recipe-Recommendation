import pandas as pd 
import numpy as np
import heapq
import sys

df = pd.read_csv("recipe.csv").reset_index()


def referFood(cuisine,type,ingredients):
    fdf = df.query(f'C_Type == "{cuisine}" or Veg_Non == "{type}"').reset_index()
    confidence = []
    
    for index, row in fdf.iterrows():
        temp = row['Describe'].lower()
        score = 0
        for i in ingredients:
            i = i.strip().lower()
            if i in temp:
                score += 1
        confidence.append(score/len(ingredients))

    best = heapq.nlargest(5, confidence)
    indexes = []
    recommend = []
    for thiscores in best:
        for j in range(len(confidence)):
            item = confidence[j]
            if item == thiscores and j not in indexes:
                indexes.append(j)
                recommend.append(fdf.loc[[j]])
    return recommend


if __name__ == "__main__":
    foodCuisine = sys.argv[1]
    foodType = sys.argv[2]
    foodIngredient = sys.argv[3: len(sys.argv)]

    result = referFood(foodCuisine,foodType,foodIngredient)
    output = []
    for x in range(5):
        output.append(result[x]['Name'].to_string())
    print(",".join([ k[5:].strip() for k in output]))



