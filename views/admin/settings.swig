{% extends 'layout.swig' %}
{% set title = 'Admin Dashboard' %}
{% block page_title %}
    <i class="pe-7s-tools"></i> Settings
{% endblock %}
{% block body %}
    <div class="col-md-6">
        <div class="card">
            <div class="header">
                <h4 class="title">Job Categories</h4>
                <p class="category">Manage Job Categories</p><br>
                <div class="row">
                    <form action="/jobcategory/saveCategory" method="post">
                        <div class="col-md-9">
                            <input type="text" name="category" class="form-control" placeholder="Enter Category title..." />
                        </div>
                        <div class="col-md-3">
                            <button type="submit" class="btn btn-info btn-block"><i class="fa fa-plus"></i> Add New</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="content table-responsive table-full-width">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th style="width: 80%">Job Category</th>
                        <th class="text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody id="td-category">
                    {% for jobcat in categories %}
                        <tr id="{{ jobcat.id }}">
                            <td class="td-category">{{ jobcat.category }}</td>
                            <td class="opt-icons">
                                <a href="" class="edit-category btn btn-default btn-sm"><i class="fa fa-pencil"></i>Edit</a>
                                <button class="btn btn-info btn-fill hidden save-category"><i class="fa fa-save"></i> Save</button>
                                {#<a href="" rel="tooltip" title="Remove Store"><i class="fa fa-trash fa-lg"></i></a>#}
                            </td>
                        </tr>
                    {% endfor %}
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="col-md-6">
        <div class="card">
            <div class="header">
                <h4 class="title">Company Sector/Industry</h4>
                <p class="category">Manage Industry</p><br>
                <div class="row">
                    <form action="/sector/saveSector" method="post">
                        <div class="col-md-9">
                            <input type="text" name="sector" class="form-control" placeholder="Enter sector or industry..." />
                        </div>
                        <div class="col-md-3">
                            <button type="submit" class="btn btn-info btn-block btnfill"><i class="fa fa-plus"></i> Add New</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="content table-responsive table-full-width">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th style="width: 80%">Sector</th>
                        <th class="text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody id="td-sector">
                    {% for sector in sectors %}
                        <tr id="{{ sector.id }}">
                            <td class="td-sector">{{ sector.title }}</td>
                            <td class="opt-icons">
                                <a href="" class="edit-sector btn btn-default btn-sm"><i class="fa fa-pencil"></i>Edit</a>
                                <button class="btn btn-info btn-fill hidden save-sector"><i class="fa fa-save"></i> Save</button>
                            </td>
                        </tr>
                    {% endfor %}
                    </tbody>
                </table>
            </div>
        </div>
    </div>

{% endblock %}

{% block scriptTag %}
<script>
$(document).ready(function() {
    $('.setting').addClass('active');

    $("#td-category").on('click', '.edit-category', function(e) {
        e.preventDefault();
        var $parentTr = $(this).parents('tr');
        var id = $parentTr.attr('id');
        var category = $parentTr.find('.td-category').text();
        $parentTr.find('.td-category').html("<input type='text' class='form-control input-content' value='" + category + "' />");
        $(this).parent('td').find('button').removeClass('hidden');
        $(this).hide();
    });


    $(".save-category").click(function() {
        var $parentTr = $(this).parents('tr');
        var id = $parentTr.attr('id');
        var category = $parentTr.find('input').val();
        $.post('/jobcategory/saveCategory', { id: id, category: category });
        $parentTr.find('.td-category').text(category);
        $(this).parent('td').find('a').show();
        $(this).hide();
    });


    $("#td-sector").on('click', '.edit-sector', function(e) {
        e.preventDefault();
        var $parentTr = $(this).parents('tr');
        var id = $parentTr.attr('id');
        var sector = $parentTr.find('.td-sector').text();
        $parentTr.find('.td-sector').html("<input type='text' class='form-control input-content' value='" + sector + "' />");
        $(this).parent('td').find('button').removeClass('hidden');
        $(this).hide();
    });


    $(".save-sector").click(function() {
        var $parentTr = $(this).parents('tr');
        var id = $parentTr.attr('id');
        var sector = $parentTr.find('input').val();
        $.post('/sector/saveSector', { id: id, sector: sector });
        $parentTr.find('.td-sector').text(sector);
        $(this).parent('td').find('a').show();
        $(this).hide();
    });
});
</script>
{% endblock %}