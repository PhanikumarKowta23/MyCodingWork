var indexVal = 0;
$(document).ready(function () {
    $("textinput").textValidation();
    $("textinputYears").textValidation();
    //mortgageCalculation modal
    $("#btnCalculator").bind('click', calculateMortgage)
    var tablemmortgages = $("#tableMortgages");
    $("#btnShowMortgages").click(function () {
        tablemmortgages.empty();
        $.ajax({
            type: 'GET',
            url: 'http://localhost:49608/api/Mortgage/',
            //datatype: 'application/json',           
            //ContentType: 'application/json; charset=utf-8',
            success: function (data) {
                //ulmmortgages.empty();
                tablemmortgages = tablemmortgages.append('<tr><th>Mortgage Name</th><th id="type" class="sortable">Mortgage Type</th><th>Effective StartDate</th><th>Effective EndDate</th><th id="irp" class="sortable">Interest Repayment</th></tr>');
                $.each(data, function (index, val) {
                    var mortgageName = val.Name;
                    var mortgageId = val.MortgageId;
                    var type = val.MortgageType == 0 ? "Variable" : "Fixed";
                    var effectiveStartDate = new Date(val.EffectiveStartDate);
                    var effectiveEndDate = new Date(val.EffectiveEndDate);
                    var intrestRate = intrestRepayment(val.InterestRepayment);
                    //var fulldata = mortgageName + ' ' + type + ' ' + effectiveStartDate
                    tablemmortgages.append(
                        '<tr id=' + mortgageId + ' class="sortable"><td>' + val.Name + '</td><td>' + type + '</td><td>' + effectiveStartDate + '</td><td>' + effectiveEndDate + '</td><td>' + intrestRate + '</td><td></tr>'
                        )                   
                });
                $("#tableMortgages tr").not('thead tr').bind('click', mortgageView)
                //Mortgage Tpe sorting
                $("#tableMortgages #type").bind('click', mortgageTypeSorting)
                //Intrest Repayment sorting
                $("#tableMortgages #irp").bind('click', intrestRepaymentSorting)                
            }
        })
    })
})
$.fn.textValidation=function() {
    var specialKeys = new Array();
    specialKeys.push(8); //Backspace
        $(function () {

            $(this).keypress( function (e) {

            var keyCode = e.which ? e.which : e.keyCode

            var ret = ((keyCode >= 48 && keyCode <= 57) || specialKeys.indexOf(keyCode) != -1);

            $(this).find(".error").css("display", ret ? "none" : "inline");
            return ret;
        });

            $(this).bind("paste", function (e) {

            return false;

        });

            $(this).bind("drop", function (e) {

            return false;

        });

    });
}
function mortgageView() {
    var tableViewmmortgages = $("#tableViewMortgages");
    tableViewmmortgages.empty();
    var mortgageId = $(this).attr("id");
    if (typeof(mortgageId) !='undefined') {
        $("#viewMortgage").modal('show');
        $.ajax({
            type: 'GET',
            url: 'http://localhost:49608/api/Mortgage/' + mortgageId,
            datatype: 'application/json',
            ContentType: 'application/json; charset=utf-8',
            success: function (data) {
                var type = data.MortgageType == 0 ? "Variable" : "Fixed";
                var intrestRate = intrestRepayment(data.InterestRepayment);
                var effectiveStartDate = new Date(data.EffectiveStartDate);
                var effectiveEndDate = new Date(data.EffectiveEndDate);
                tableViewmmortgages = tableViewmmortgages.append('<tr><td><b>Mortgage Name</b></td><td>' + data.Name + '</td></tr><tr><td><b>Mortgage Type</b></td><td>' + type + '</td></tr><tr><td><b>Interest Repayment</b></td><td>' + intrestRate + '</td></tr><tr><td><b>Effective StartDate</b></td><td>' + effectiveStartDate + '</td></tr><tr><td><b>Effective EndDate</b></td><td>' + effectiveEndDate + '</td></tr><tr><td><b>Cancellation Fee</b></td><td>' + data.CancellationFee + '</td></tr><tr><td><b>Establishment Fee</b></td><td>' + data.EstablishmentFee + '</td></tr>');
            }
        })
    }
   
}
function intrestRepayment(intrestVal) {
    switch (intrestVal) {
        case 0:
            return "InterestOnly";
        case 1:
            return "PrincipalAndInterest";
        case 2:
            return "Fixed";
        case 3:
            return "Variable";

    }
}
function mortgageTypeSorting() {
       sortTable(1);
}
function intrestRepaymentSorting() {
    
    sortTable(4);
}
function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("tableMortgages");
  switching = true;
  //Set the sorting direction valto ascending:
  dir = "asc"; 
  /*Make a loop that will continue until
  no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
    first, which contains table headers):*/
    for (i = 1; i < (rows.length - 1); i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
      one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      /*check if the two rows should switch place,
      based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
      and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount ++;      
    } else {
      /*If no switching has been done AND the direction is "asc",
      set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}
function calculateMortgage() {
    if ($("#textinput").val() != "" && $("#textinputYears").val() != "") {
        $("#divAlertMsg").addClass("hide");
        var tableCalcmmortgages = $("#tableCalcMortgages");
        tableCalcmmortgages.empty();
        $("#CalcMortgage").modal('show');
        var pv = $("#textinput").val();
        var nperiod = $("#textinputYears").val() * 12;
        var result = PMT(8.5 / 1200, nperiod, pv, 0, 0);
        tableCalcmmortgages = tableCalcmmortgages.append('<tr><td><b>Loan Amount</b></td><td>' + pv + '</td></tr><tr><td><b>Loan Duration</b></td><td>' + nperiod + "months" + '</td></tr><tr><td><b>Interest Rate</b></td><td>' + "8.5%" + '</td></tr><tr><td><b>EMI Per Month</b></td><td>' + result + '</td></tr>');
    }else{
        $("#divAlertMsg").removeClass("hide");
    }
   
}

//calculate logic from PMT excel 
function PMT(rate, nperiod, pv, fv, type) {
    if (!fv) fv = 0;
    if (!type) type = 0;

    if (rate == 0) return -(pv + fv)/nperiod;

    var pvif = Math.pow(1 + rate, nperiod);
    var pmt = rate / (pvif - 1) * -(pv * pvif + fv);

    if (type == 1) {
        pmt /= (1 + rate);
    };

    return pmt;
}