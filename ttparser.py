import tabula as tb
import pandas as pd
import numpy as np

# load the tt.pdf file into a pandas dataframe after removing the unnecessary headings 
# (might need changes if the format is changed)

pdf_file= 'tt.pdf'

dfs = tb.read_pdf(pdf_file, stream=True, pages='all', pandas_options={'header': None}, columns=[106.56, 175.68, 266.40, 348.48, 431.28, 511.92, 594.72, 666, 735.0], guess=False)
dfs[0] = dfs[0].iloc[4:]

# creating the table 
table = []
week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

for i in range(len(dfs)):
    dfs[i] = dfs[i].iloc[:, 1:]
    if i%2 != 0:
        dfs[i][8] = np.nan
#     else:
#         dfs[i] = dfs[i].iloc[:, :8] 

# dfs[7] = dfs[7].iloc[:, :8]

cols = dfs[0].values.tolist()[0]

for df in dfs: 
    df.columns = cols


for i in range(len(dfs)):
    start_idxs = dfs[i].index[dfs[i]["Venue"] == 'LH1'].tolist()

    # there are at max 2 timeslots on a single page of the pdf in the current format
    timeslot_tts = [[], []] 

    if len(start_idxs) == 0:
        continue

    elif len(start_idxs) == 1:
        for day in week:
            tmp = dfs[i].loc[start_idxs[0]:]
            tmp = tmp[tmp[day].notnull()][day].tolist()
            timeslot_tts[0].append("|".join(tmp))

    else:
        for day in week:
            tmp = dfs[i].loc[start_idxs[0]:start_idxs[-1]-1]
            tmp1 = pd.concat([dfs[i].loc[start_idxs[-1]:], dfs[i+1]])
            tmp = tmp[tmp[day].notnull()][day].tolist()
            tmp1 = tmp1[tmp1[day].notnull()][day].tolist()
            timeslot_tts[0].append("|".join(tmp))
            timeslot_tts[1].append("|".join(tmp1))

    table_entries = [','.join(timeslot) for timeslot in timeslot_tts]

    for entry in table_entries:
        table.append(entry)

print('\n'.join(table))