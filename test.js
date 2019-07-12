
        var iDisplay;
        var emp;
        var emp1;
        var dCount = 0;
        var displayE = $("#displayE");
        var empDeleted = $("#empDeleted");

    $(function () {
      displayDeleted();
        var totalE = $("#totalE");
        var empList = $('#empList');
        $.ajax({
            type: 'GET',
            async: false,
            url: ' http://dummy.restapiexample.com/api/v1/employees',
            dataType: 'json',
            success: function (data) {

                emp = data;
                emp1 = data.length;

                $.each(data, function (index, val) {

                 empList.append('<div class="row d-flexs justify-content-between align-items-center rowStyle" id="employee-' +
                                index + '" ><p id="par" data-toggle="tooltip" title="age:'
                                + val.employee_age +"salary:" + val.employee_salary + '" >'
                                + val.employee_name + '</p><span  class=" fa fa-trash-o " style="margin:left:100px;"  onclick="deleteEmployee(' + index +')" ></span></div>');

                });

                totalE.append('<span> ' + emp.length + '</span>');
                displayE.append('<span> ' + emp.length + '</span>');
            }
        });


        $("#myInput").on("keyup", function () {
            var value = $(this).val().toLowerCase();
            $("#empList .row ").filter(function () {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
            });

            var hiddenRows = $("#empList p:hidden ").length;
            var filterRows = $("#empList p:visible ").length;
            var nrRow = "";
            if (value.length > 0) {
                nrRow = "The number of filterd rows is: " + filterRows +"from "+ hiddenRows;
            }
            document.getElementById("emp_filter").innerHTML = nrRow;
        });

        //tooltip
        $('[data-toggle="tooltip"]').tooltip({ placement: "top"});

    });

        var deletedEmployees=[];
        var localData;
        function deleteEmployee(index) {


            dCount++;
            var employee = emp[index];
            deletedEmployees.push(employee);
            var element = document.getElementById("employee-" + index);
            localStorage.setItem('mysite1',JSON.stringify(deletedEmployees));
            element.remove();
            document.getElementById("deleteE").innerHTML = dCount;
            iDisplay = emp1 - dCount;
            document.getElementById("displayE").innerHTML = iDisplay;
            empDeleted.empty();
             displayDeleted();

        }

        function displayDeleted(){
          localData = JSON.parse(localStorage.getItem('mysite1'));
          deletedEmployees = localData;
         for(var i=0;i<localData.length;i++){

           empDeleted.append('<div class="row d-flexs justify-content-between  align-items-center rowStyle" ><p data-toggle="tooltip"  data-placement="top" >'
          + localData[i].employee_name + '</p><span class="fa fa-trash-o" ></span></div>');

         }
        }
