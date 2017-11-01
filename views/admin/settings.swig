{% extends 'layout.swig' %}
{% set title = 'Admin Dashboard' %}
{% block page_title %}
    <i class="pe-7s-tools"></i> Settings
{% endblock %}
{% block body %}
    <div class="col-md-12">
        <div class="card">
            <div class="header">
                <h4 class="title">Job Categories</h4>
                <p class="category">Manage Job Categories</p><br>
                <div class="row">
                    <form action="/jobcategory/addcategory" method="post">
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
                        <th style="width: 90%">Job Category</th>
                        <th class="text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {% for jobcat in categories %}
                        <tr>
                            <td>{{ jobcat.category }}</td>
                            <td class="opt-icons">
                                <a href="" class="edit-store" rel="tooltip" title="Edit Store"><i class="fa fa-pencil fa-lg"></i></a>
                                <a href="" rel="tooltip" title="Remove Store"><i class="fa fa-trash fa-lg"></i></a>
                            </td>
                        </tr>
                    {% endfor %}
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <div class="col-md-6 hidden">
        <div class="card">
            <div class="header">
                <h4 class="title">Genre</h4>
                <p class="category">Manage Music Genre</p><br>
                <div class="row">
                    <form action="/setting/addgenre" method="post">
                        <div class="col-md-9">
                            <input type="text" name="genre" class="form-control" placeholder="Enter genre title..." />
                        </div>
                        <div class="col-md-3">
                            <button type="submit" class="btn btn-info btn-block btnfill"><i class="fa fa-plus"></i> Add Genre</button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="content table-responsive table-full-width">
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th style="width: 500px">Genre Title</th>
                        <th class="text-center">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {% for genre in genres %}
                        <tr>
                            <td>{{ genre.genre_title }}</td>
                            <td class="opt-icons">
                                <a href="" class="edit-genre" rel="tooltip" title="Edit Genre"><i class="fa fa-pencil"></i></a>
                                <a href="" rel="tooltip" title="Remove Genre"><i class="fa fa-trash"></i></a>
                            </td>
                        </tr>
                    {% endfor %}
                    </tbody>
                </table>
            </div>
        </div>
    </div>

{% endblock %}

{% block script %}

{% endblock %}