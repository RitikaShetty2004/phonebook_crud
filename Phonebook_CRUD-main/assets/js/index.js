// 🔍 Handle search
$("#search_form").submit(function(event) {
    event.preventDefault();
    const query = $("#search_input").val().trim();

    if (query.length === 0) {
        location.reload(); // Show full list if empty
        return;
    }

    $.ajax({
        url: `/api/users/search?name=${encodeURIComponent(query)}`, // ✅ updated route
        method: "GET",
        success: function(response) {
            $("#user_table_body").html(""); // Clear existing rows

            if (response.length === 0) {
                $("#user_table_body").append("<tr><td colspan='6'>No results found</td></tr>");
                return;
            }

            response.forEach(user => {
                $("#user_table_body").append(`
                    <tr>
                        <td>${user._id}</td>
                        <td>${user.name}</td>
                        <td>${user.email}</td>
                        <td>${user.number}</td>
                        <td>${user.gender}</td>
                        <td>
                            <a href="/update-user?id=${user._id}" class="btn btn-warning btn-sm">Edit</a>
                            <a href="#" class="btn btn-danger btn-sm delete" data-id="${user._id}">Delete</a>
                        </td>
                    </tr>
                `);
            });
        },
        error: function(err) {
            alert("Error fetching search results");
            console.error(err);
        }
    });
});
