import pandas as pd
from sklearn.cluster import KMeans 
import sys

data=sys.argv[1]
a=pd.DataFrame(eval(data),columns=['lat_states','long_states'])
func=KMeans(n_clusters=int(sys.argv[2]))
b=pd.DataFrame(a)
func.fit(a)
y_pred=func.predict(a)
centers=func.cluster_centers_
ans = []
for i in centers:
	ans.append([i[0],i[1]])
print(ans)