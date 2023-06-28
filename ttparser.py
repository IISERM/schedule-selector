import tabula as tb
import pandas as pd

# load the tt.pdf file into a pandas dataframe after removing the unnecessary headings 
# (might need changes if the format is changed)

pdf_file= 'tt.pdf'

dfs = tb.read_pdf(pdf_file, stream=True, pages='all', pandas_options={'header': None}, columns=[49.68, 109.44, 178.56, 243.36, 305.28, 365.04, 423.36, 486], guess=False)
dfs[0] = dfs[0].iloc[2:]
cols = dfs[0].values.tolist()[0]

for df in dfs: 
    df.columns = cols

# creating the table 
table = []
week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


for df in dfs:
    start_idxs = df.index[df["Venue"] == 'LH1'].tolist()

    # there are at max 2 timeslots on a single page of the pdf in the current format
    timeslot_tts = [[], []] 

    if len(start_idxs) == 0:
        continue

    elif len(start_idxs) == 1:
        for day in week:
            tmp = df.loc[start_idxs[0]:]
            tmp = tmp[tmp[day].notnull()][day].tolist()
            timeslot_tts[0].append("|".join(tmp))

    else:
        for day in week:
            tmp = df.loc[start_idxs[0]:start_idxs[-1]-1]
            tmp1 = df.loc[start_idxs[-1]:]
            tmp = tmp[tmp[day].notnull()][day].tolist()
            tmp1 = tmp1[tmp1[day].notnull()][day].tolist()
            timeslot_tts[0].append("|".join(tmp))
            timeslot_tts[1].append("|".join(tmp1))

    table_entries = [','.join(timeslot) for timeslot in timeslot_tts]

    for entry in table_entries:
        table.append(entry)

print('\n'.join(table))