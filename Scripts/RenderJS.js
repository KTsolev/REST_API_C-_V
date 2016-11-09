function Render(contactsJsonPayload)
{
    $(contactsJsonPayload).each(function (i, item)
    {
        var tr = document.createElement("tr");
        var id = document.createElement("td");
        $(id).text(item.ID);
        $(id).attr("class", "tds");
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
        $(view).text("Detail View");
        $(view).attr("class", "tds");
        $(view).on('click', function () {
            var position = $(this).position();
            $("#detailView").css({ "z-index": 5, 'right': 60, top: position.top});
            var id = $(this).parent().children().first().text();
            var url = '/api/employee?id=' + id;
            QueryOne(url);
        });
        $(tr).append(id);
        $(tr).append(title);
        $(tr).append(name);
        $(tr).append(surname);
        $(tr).append(salary);
        $(tr).append(tax1);
        $(tr).append(tax2);
        $(tr).append(tax3);
        $(tr).append(view);
        $("#employees").append(tr);
    });
    CollorMatching();
}
function RenderOne(result)
{
    var title = document.createElement('h3');
    $(title).text("Title: " + result.Title);
    var name = document.createElement('h3');
    $(name).text("Name: " + result.Name);
    var surname = document.createElement('h3');
    $(surname).text("Surname: " + result.Surname);
    var gender = document.createElement('h3');
    $(gender).text("Gender: " + result.Gender);
    var date = document.createElement('h3');
    $(date).text("Date Of Birth: " + result.DateOfBirth);
    var age = document.createElement('h3');
    $(age).text("Age: " + result.Age);
    var parent = $("#detailView");
    var pic = document.createElement('img');
    $(pic).attr('id', 'icon');
    var cancel = document.createElement('img');
    $(cancel).attr('id', 'cancel');
    $(cancel).attr('alt', 'cancel-icon');
    $(cancel).attr('src', '../Content/cancel.png');
    $(cancel).on('click', function () {
        var position = $(this).position();
        $(parent).css({ "border": "0px groove #0089a8", "z-index": -1 });
        $("#detailView").empty();
    });
    if(result.Gender === "female")
    {
        $(pic).attr('alt', 'female-icon');
        $(pic).attr('src', '../Content/female1.jpg');
    }
    else
    {
        $(pic).attr('alt', 'male-icon');
        $(pic).attr('src', '../Content/male1.jpg');
    }
    $(parent).css({ "border": "1px groove #0089a8" });
    $(parent).append(cancel);
    $(parent).append(pic);
    $(parent).append(title);
    $(parent).append(name);
    $(parent).append(surname);
    $(parent).append(gender);
    $(parent).append(date);
    $(parent).append(age);
}
function QueryTheApi(url)
{
    $.getJSON(url, function (results)
    {
        $("#employees tr").slice(1).remove();
        Render(results);
    });
}
//Needed to separate functions cause there was mixture between which function when to be called//
function QueryOne(url)
{
    $.getJSON(url, function (results)
    {
        $("#detailView").empty();
        RenderOne(results);
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
        id = 3;
        text = $("#name").val().toLowerCase();
    }
    if (surname == "searchBySurName" && $("#surname").val() != "")
    {
        id = 4;
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
            $(names[i]).html(newValue);
        }
    }
}

function FormatNum(num)
{
    var p = num.toFixed(2).split(".");
    return p[0].split("").reverse().reduce(function (acc, num, i, orig)
    {
        return num + (i && !(i % 3) ? "," : "") + acc;
    }, "") + "." + p[1];
}