function Render(contactsJsonPayload) {
    $(contactsJsonPayload).each(function (i, item) {
        var tr = document.createElement("tr");
        var title = document.createElement("td");
        $(title).text(item.Title);
        $(title).attr("class", "tds");
        var name = document.createElement("td");
        $(name).text(item.Name);
        $(name).attr("class", "tds");
        var surname = document.createElement("td");
        $(surname).text(item.Surname);
        $(surname).attr("class", "tds");
        var salary = document.createElement("td");
        $(salary).text(item.Salary);
        $(salary).attr("class", "tds");
        var tax1 = document.createElement("td");
        $(tax1).text(item.IncomeTax);
        $(tax1).attr("class", "tds");
        var tax2 = document.createElement("td");
        $(tax2).text(item.NationalInsurance);
        $(tax2).attr("class", "tds");
        var tax3 = document.createElement("td");
        $(tax3).text(item.HomeTake);
        $(tax3).attr("class", "tds");
        var view = document.createElement("td");
        $(view).text("View");
        $(view).attr("class", "tds");
        var tdelete = document.createElement("td");
        $(tdelete).attr("class", "tds");
        $(tdelete).text("Delete");
        $(tr).append(title);
        $(tr).append(name);
        $(tr).append(surname);
        $(tr).append(salary);
        $(tr).append(tax1);
        $(tr).append(tax2);
        $(tr).append(tax3);
        $(tr).append(view);
        $(tr).append(tdelete);
        $("#employees").append(tr);
    });
}

function QueryTheApi(url)
{
    $.getJSON(url, function (results) {
        $("#employees tr").slice(1).remove();
        console.log(results);
        Render(results);
    });
}