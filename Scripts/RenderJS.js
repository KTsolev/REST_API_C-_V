function Render(contactsJsonPayload)
{
    $(contactsJsonPayload).each(function (i, item)
    {
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
        $(salary).text(FormatNum(item.Salary));
        $(salary).attr("class", "tds");
        var tax1 = document.createElement("td");
        $(tax1).text(FormatNum(item.IncomeTax));
        $(tax1).attr("class", "tds");
        var tax2 = document.createElement("td");
        $(tax2).text(FormatNum(item.NationalInsurance));
        $(tax2).attr("class", "tds");
        var tax3 = document.createElement("td");
        $(tax3).text(FormatNum(item.HomeTake));
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
    CollorMatching();
}

function QueryTheApi(url)
{
    $.getJSON(url, function (results)
    {
        $("#employees tr").slice(1).remove();
        Render(results);
    });
}

function CollorMatching()
{
    var id = 0;
    var name = $("#name").attr('name');
    var surname = $("#surname").attr('name');
    var text = "";
    if (name == "searchByName" && $("#name").val() != "")
    {
        id = 2;
        text = $("#name").val().toLowerCase();
    }
    if (surname == "searchBySurName" && $("#surname").val() != "")
    {
        id = 3;
        text = $("#surname").val().toLowerCase();
    }
    if (text !== "")
    {
        var names = $("#employees tr td:nth-child(" + id + ")");
        var value = "";
        var newValue = "";
        var replaceValue = "";
        var values = [];
        for (var i = 0; i < names.length; i++)
        {
            value = $(names[i]).text().toLowerCase();
            replaceValue = "<span class='replacer'>" + text + "</span>";
            newValue = value.replace(text, replaceValue);
            //newValue = newValue.replace(newValue[0], newValue[0].toUpperCase());
            $(names[i]).html(newValue);
        }
    }
}

function FormatNum(num)
{
    var p = num.toFixed(2).split(".");
    return  p[0].split("").reverse().reduce(function (acc, num, i, orig) {
        return num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
}