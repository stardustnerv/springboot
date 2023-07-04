$(document).ready(function() {
      // Show/hide the control panel
      $("#control-panel-btn").click(function() {
        $("#control-panel").toggle();
      });

      // Make the control panel draggable
      $("#control-panel").draggable({cancel: "#sentence-list-csv td" });


      // Append sentence to the CSV
      $("#append-to-csv").click(function() {
        var sentence = $("#sentence-input").val();
        if (sentence) {
          $.post("/append-to-csv", { sentence: sentence }, function(response) {
            if (response === "Success") {
              // Refresh the CSV content
              $.post("/get-csv-content", function(csvContent) {
                if (csvContent && csvContent.length > 0) {
                  var sentenceListCsv = $("#sentence-list-csv");
                  sentenceListCsv.empty(); // Clear previous content
                  csvContent.forEach(function(line) {
                    var sentenceLine = line[0]; // Assuming single column CSV
                    var row = $("<tr></tr>");
                    row.append($("<td></td>").text(line[0]));
                    var actionCell = $("<td></td>");
                    var actionButton = $("<button type='button' class='custom-button'></button>").text("...");
                    actionCell.append(actionButton);
                    row.append(actionCell);
                    sentenceListCsv.append(row);
                  });
                }
              });
            } else {
              alert(response);
            }
          });
        } else {
          alert("No sentence to append.");
        }
      });

      // Function to retrieve and display CSV content
      function displayCsvContent() {
        $.post("/get-csv-content", function(csvContent) {
          if (csvContent && csvContent.length > 0) {
            var sentenceListCsv = $("#sentence-list-csv");
            sentenceListCsv.empty(); // Clear previous content
            csvContent.forEach(function(line) {
              var sentenceLine = line[0]; // Assuming single column CSV
              var row = $("<tr></tr>");
              row.append($("<td></td>").text(line[0]));
              var actionCell = $("<td></td>");
              var actionButton = $("<button type='button' class='custom-button'></button>").text("...");
              actionCell.append(actionButton);
              row.append(actionCell);
              sentenceListCsv.append(row);
            });
          }
        });
      }

      // Call the function initially when the page loads
      displayCsvContent();

      // Add submenu after clicking the 'custom-button'
$(document).on("click", ".custom-button", function() {
  if ($(this).next(".submenu").length === 0) {
    var cellText = $(this).closest("tr").find("td:first-child").text();
    var submenu = $("<div class='submenu'></div>");
    var addButton = $("<button type='button' class='add-button'>ADD</button>");

    addButton.click(function() {
      $("#sentence-input").val(cellText);
    });

    submenu.append(addButton);
    $(this).after(submenu);
  }
});

// Remove submenu when clicking outside
$(document).click(function(e) {
  if (!$(e.target).hasClass("custom-button")) {
    $(".submenu").remove();
  }
});

    });