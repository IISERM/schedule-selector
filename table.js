let reftable;
let selected_courses = [];
let all_courses = [];

/* ODD SEM */
// let all_packages = {'MAJ-PHY-4TH':['PHY401','PHY402','PHY403','PHY411'], 
//                     'MAJ-PHY-3RD':['PHY301','PHY302','PHY310','PHY311','PHY303'],
//                     'MAJ-BIO-4TH':['BIO401','BIO402','BIO411'],
//                     'MAJ-BIO-3RD':['BIO301','BIO302','BIO303','BIO311'],
//                     'MAJ-MTH-4TH':['MTH402','MTH403'],
//                     'MAJ-MTH-3RD':['MTH301','MTH302','MTH303','MTH304'],
//                     'MAJ-CHM-4TH':['CHM401','CHM402','CHM411'],
//                     'MAJ-CHM-3RD':['CHM301','CHM302','CHM303','CHM311'], 
//                     'CORE-2ND':['PHY201','BIO201','CHM201','MTH201','PHY201(T)','BIO201(T)','CHM201(T)','MTH201(T)'],
//                     'CORE-1ST':['PHY101','CHM101','BIO101','MTH101','PHY101(T)','CHM101(T)','BIO101(T)','MTH101(T)']}

/* EVEN SEM */
let all_packages = {'MAJ-PHY-4TH':['PHY412'], 
                     'MAJ-PHY-3RD':['PHY304','PHY306','PHY312'],
                     'MAJ-BIO-4TH':['BIO403','BIO404','BIO412'],
                     'MAJ-BIO-3RD':['BIO304','BIO305','BIO306','BIO312'],
                     'MAJ-MTH-4TH':[],
                     'MAJ-MTH-3RD':['MTH305','MTH307','MTH308','MTH309'],
                     'MAJ-CHM-4TH':['CHM403','CHM404','CHM412'],
                     'MAJ-CHM-3RD':['CHM304','CHM305','CHM306','CHM312'], 
                     'CORE-2ND':['PHY202','BIO202','CHM202','MTH202','PHY202(T)','BIO202(T)','CHM202(T)','MTH202(T)'],
                     'CORE-1ST':['PHY102','CHM102','BIO102','MTH102','PHY102(T)','CHM102(T)','BIO102(T)','MTH102(T)']}

let package_courses = Object.keys(all_packages);
let tbl;

/* HTML Table Construction helper functions*/
  function addCell(tr, val) {
    var td = document.createElement('td');
    td.innerHTML = val;
    tr.appendChild(td)
  }

  function addHeadCell(tr, val) {    
    var th = document.createElement('th');
    th.innerHTML = val;
    tr.appendChild(th)
  }

  function addRow(tbl, first, vals) {
    var tr = document.createElement('tr');
    var tbody = tbl.children[1];

    addHeadCell(tr, first);

    for(let val of vals)
    {
        addCell(tr, val);
    }

    tbody.appendChild(tr);
  }

  function addHead(tbl, first, vals) {
    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    
    addHeadCell(tr, first);

    for(let val of vals)
    {
        addHeadCell(tr, val);
    }

    thead.appendChild(tr);
    tbl.appendChild(thead)
  }

  function createBody(tbl){
    var tbody = document.createElement('tbody');
    tbl.appendChild(tbody);
  }
/* HTML Table Construction helper functions END*/

/* Parses the input csv format into a reference table*/
  function makeRefTable(){
    let ref_table = document.getElementById('reftable').innerHTML.replaceAll(' ', '').trim();
    let ref_rows_raw = ref_table.split("\n");
    let ref_rows = [];
    for(row_raw of ref_rows_raw){

      row_formatted = row_raw.split(",");
      row_final = [];

      for(elt of row_formatted){
        row_final.push(elt.split("|"));
        all_courses = all_courses.concat(elt.split("|"));
      }

      ref_rows.push(row_final);
    }

    all_courses = [...new Set(all_courses)].filter(item => item !== "").filter(item => item !== "-").sort();
    return ref_rows;
}

/* Constructs new reference table (not html) based on selected course list*/

  function makeNewTable(selected_courses){
    var new_table = [];

    for(row of reftable){
      new_row = [];
      for(elt of row){
        intersect = elt.filter(i => selected_courses.includes(i)); 
        new_row.push((intersect.length > 0) ? intersect.join("<br>") : "-");
      }
      new_table.push(new_row);
    }

    return new_table;
  }

  /* Constructs new HTML table based on selected course list*/

  function constructTable(tbl, selected_courses){
    table_new = makeNewTable(selected_courses);

    while (tbl.hasChildNodes()) {
      tbl.removeChild(tbl.lastChild);
    }

    addHead(tbl, "", ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]);
    createBody(tbl);
    addRow(tbl, "08:00", table_new[0]);
    addRow(tbl, "09:00", table_new[1]);
    addRow(tbl, "10:00", table_new[2]);
    addRow(tbl, "11:00", table_new[3]);
    addRow(tbl, "12:00", table_new[4]);
    addRow(tbl, "13:00", table_new[5]);
    addRow(tbl, "14:00", table_new[6]);
    addRow(tbl, "15:00", table_new[7]);
    addRow(tbl, "16:00", table_new[8]);
    addRow(tbl, "17:00", table_new[9]);
  }

  /* Create master list of courses in dropdown*/

  function addDataList(){
    var options = '';
    for(option of all_courses){
      options += '<option value="' + option + '" />';
    }
    for(option of package_courses){
      options += '<option value="' + option + '" />';
    }
    document.getElementById("code-picker").innerHTML = options;
  }

  /* Update the selected course list display */

  function updateCourse(){
    var courselist = document.getElementById("selected-courses");
    courselist.innerHTML = "Selected courses: " + selected_courses.join(", "); 
  }
  
  /* Construct default table */

  function main() {
    tbl = document.getElementById('tbl');
    addHead(tbl, "", ["Mon", "Tue", "Wed", "Thur", "Fri", "Sat"]);
    createBody(tbl);
    addRow(tbl, "08:00", ['-', '-', '-', '-', '-', '-']);
    addRow(tbl, "09:00", ['-', '-', '-', '-', '-', '-']);
    addRow(tbl, "10:00", ['-', '-', '-', '-', '-', '-']);
    addRow(tbl, "11:00", ['-', '-', '-', '-', '-', '-']);
    addRow(tbl, "12:00", ['-', '-', '-', '-', '-', '-']);
    addRow(tbl, "13:00", ['-', '-', '-', '-', '-', '-']);
    addRow(tbl, "14:00", ['-', '-', '-', '-', '-', '-']);
    addRow(tbl, "15:00", ['-', '-', '-', '-', '-', '-']);
    addRow(tbl, "16:00", ['-', '-', '-', '-', '-', '-']);
    addRow(tbl, "17:00", ['-', '-', '-', '-', '-', '-']);
  
    reftable = makeRefTable();
    addDataList();
    }


  /* onClick functions for the input buttons */

  function addCourse(){
    var inputVal = document.getElementsByClassName("code-picker")[0].value.trim().toUpperCase();
    if((all_courses.includes(inputVal)) && !(selected_courses.includes(inputVal))) {
      selected_courses.push(inputVal);

      updateCourse();
      generate();
    }
    else if (package_courses.includes(inputVal)) {
      selected_courses = new Set(selected_courses.concat(all_packages[inputVal]));
      selected_courses = Array.from(selected_courses);

      updateCourse();
      generate();
    }

    

    document.getElementsByClassName("code-picker")[0].value = "";
  }

  function removeCourse(){
    var inputVal = document.getElementsByClassName("code-picker")[0].value.trim().toUpperCase();
    if(selected_courses.includes(inputVal)) {
      selected_courses = selected_courses.filter(item => item !== inputVal);

       updateCourse();
       generate();

    }
    else if(package_courses.includes(inputVal)) { 
      selected_courses = selected_courses.filter(item => !(all_packages[inputVal].includes(item)));
     
      updateCourse();
      generate();

    }

    document.getElementsByClassName("code-picker")[0].value = "";
  }
  
  function removeAll(){
    selected_courses = [];
    updateCourse();
    generate();
  }

  function addAll(){
    selected_courses = [...all_courses];
    var courselist = document.getElementById("selected-courses");
    courselist.innerHTML = "Selected courses: All";
 
    generate();
  }

  function generate(){
    constructTable(tbl, selected_courses);
  }

  /* onClick functions for the input buttons END*/

  function setColor(){
    var src = document.getElementById('color-picker');
    var r = document.querySelector(':root');
    r.style.setProperty('--color', src.value);
    r.style.setProperty('--bgcol', hexGradient(src.value, "#ffffff", 0.4));
    r.style.setProperty('--bgcol2', hexGradient(src.value, "#000000", 0.7));
  }

    /* helper function for printing */
    function hexToRgb(hex, op){
      var c;
      if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
          c= hex.substring(1).split('');
          if(c.length== 3){
              c= [c[0], c[0], c[1], c[1], c[2], c[2]];
          }
          c= '0x'+c.join('');
          return [(c>>16)&255, (c>>8)&255, c&255];
      }
      throw new Error('Bad Hex');
  }

  function hexGradient(color1, color2, weight) {
    var w1 = weight;
    var w2 = 1 - w1;
    color1 = hexToRgb(color1);
    color2 = hexToRgb(color2);
    var rgb = [Math.round(color1[0] * w1 + color2[0] * w2),
        Math.round(color1[1] * w1 + color2[1] * w2),
        Math.round(color1[2] * w1 + color2[2] * w2)];
    return "rgb(" + rgb.join(",") +")";
}
  /* to print the table as an image */
  
  function exportAsPng() {
    var node = document.getElementById("tbl");
    var options = {
        quality: 1.0
    };

    domtoimage.toPng(node, options).then(function(dataURL){
        var link = document.createElement('a');
        link.download = 'schedule.png';
        link.href = dataURL;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    })
}

  function exportAsCSV() {
    let data = "";
    const tableData = [];
    const rows = document.querySelectorAll("#tbl tr");

    for (const row of rows) {
      const rowData = [];
      for (const [index, column] of row.querySelectorAll("th, td").entries()) {
        rowData.push(column.innerText.replace(/\n/g, "|"));
      }
      tableData.push(rowData.join(","));
    }
    data += tableData.join("\n");

    var link = document.createElement("a");
    link.href = URL.createObjectURL(new Blob([data], { type: "text/csv" }));
    link.setAttribute("download", "schedule.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
