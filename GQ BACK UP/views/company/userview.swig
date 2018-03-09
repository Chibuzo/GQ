{% extends '../layout.swig' %}
{% set title = 'User Profile' %}
{% block page_title %}
  <i class="pe-7s-user"></i> &nbsp;My Profile
{% endblock %}

{% block body %}
<div class="content">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-8">
                        <div class="card">
                            <div class="header">
                                <h4 class="title">User Contents</h4>
                            </div>
                            <div class="content">
                                <ul class="nav nav-tabs">
                                  <li class="active"><a href="#singles" data-toggle="tab"><i class="pe-7s-music"></i> &nbsp;Singles</a></li>
                                  <li><a href="#albums" data-toggle="tab"><i class="pe-7s-album"></i></i> &nbsp;Albums</a></li>
                                  <li><a href="#videos" data-toggle="tab"><i class="pe-7s-video"></i> &nbsp;Videos</a></li>
                                </ul>
                                <div class="tab-content">
                                  <div class="tab-pane fade active in" id="singles">
                                    <div class="">
                                      <table class="table table-striped">
                                        <thead>
                                          <tr>
                                            <th>Uploaded On</th>
                                            <th>Single Title</th>
                                            <th>Artist</th>
                                            <th>Genre</th>
                                            <th>Label</th>
                                            <th>Prev. Released</th>
                                            <th>Sales Start</th>
                                            <!--<th class="text-center">Action</th>-->
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {% set n = 0 %}
                                          {% for single in user.singles %}
                                            <tr id="{{ single.id }}">
                                              <td>{{ single.createdAt | date('d/m/Y') }}</td>
                                              <td>{{ single.song_title }}</td>
                                              <td>{{ single.main_artist }}</td>
                                              <td>{{ single.primary_genre }}</td>
                                              <td>{{ single.label_name }}</td>
                                              <td>{{ single.previously_released }}</td>
                                              <td>{{ single.sales_start_date | date('d/m/Y') }}</td>
                                              <!--<td class="opt-icons">
                                                <a href="#newSingleModal" data-toggle="modal" class="edit-single" rel="tooltip" title="Edit Single"><i class="fa fa-pencil"></i> </a>
                                                <a href="#" class="view-owner" rel="tooltip" title="Download Single"><i class="fa fa-download"></i> </a>
                                                <a href="/single/{{ single.id }}" class="" rel="tooltip" title="View Single"><i class="fa fa-eye"></i> </a>
                                                <a href="#" class="deliver-item" rel="tooltip" title="Mark Single as delivered"><i class="fa fa-clock-o"></i></a> 
                                              </td>-->
                                            </tr>
                                          {% endfor %}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                  <div class="tab-pane fade in" id="albums">
                                    <div class="">
                                        <table class="table table-striped">
                                          <thead>
                                            <tr>
                                              <th>Uploaded On</th>
                                              <th>Album Title</th>
                                              <th>Artist</th>
                                              <th>Genre</th>
                                              <th>Prev. Released</th>
                                              <th>Sales Start</th>
                                              <!--<th class="text-center">Action</th>-->
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {% for album in user.albums %}
                                              <tr id="{{ album.id }}">
                                                <td>{{ album.createdAt | date('d/m/Y') }}</td>
                                                <td>{{ album.album_title }}</td>
                                                <td>{{ album.main_artist }}</td>
                                                <td>{{ album.primary_genre }}</td>
                                                <td>{{ album.previously_released }}</td>
                                                <td>{{ album.sales_start_date | date('d/m/Y') }}</td>
                                                <!--<td class="opt-icons">
                                                  <a href="#newAlbumModal" data-toggle="modal" class="edit-album" rel="tooltip" title="Edit Album"><i class="fa fa-pencil"></i> </a>
                                                  <a href="#" class="view-owner" rel="tooltip" title="Download Album"><i class="fa fa-download"></i> </a>
                                                  <a href="/album/{{ album.id }}" class="" rel="tooltip" title="View Album"><i class="fa fa-eye"></i> </a>
                                                  <a href="#" class="deliver-item" rel="tooltip" title="Mark Album as delivered"><i class="fa fa-clock-o"></i></a> 
                                                </td>-->
                                              </tr>
                                            {% endfor %}
                                          </tbody>
                                        </table>
                                    </div>
                                  </div>
                                  <div class="tab-pane fade in" id="videos">
                                    <div class="">
                                      <table class="table table-striped">
                                        <thead>
                                          <tr>
                                            <th>Uploaded On</th>
                                            <th>Video Title</th>
                                            <th>Artist</th>
                                            <th>Copyright Holder</th>
                                            <th>Copyright Year</th>
                                            <th>Release Date</th>
                                            <!--<th class="text-center">Action</th>-->
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {% set n = 0 %}
                                          {% for video in user.videos %}
                                            <tr id="{{ video.id }}">
                                              <td>{{ video.createdAt | date('d/m/Y') }}</td>
                                              <td>{{ video.video_title }}</td>
                                              <td>{{ video.main_artist }}</td>
                                              <td>{{ video.copyright_holder }}</td>
                                              <td>{{ video.copyright_year }}</td>
                                              <td>{{ video.release_date | date('d/m/Y') }}</td>
                                              <!--<td class="opt-icons">
                                                <a href="#newVideoModal" data-toggle="modal" class="edit-video" rel="tooltip" title="Edit Video"><i class="fa fa-pencil"></i> </a>
                                                <a href="#" class="" rel="tooltip" title="Download Video"><i class="fa fa-download"></i> </a>
                                                <a href="/video/{{ video.id }}" class="" rel="tooltip" title="View Video"><i class="fa fa-eye"></i> </a>
                                                <a href="#" class="deliver-item" rel="tooltip" title="Mark Video as delivered"><i class="fa fa-clock-o"></i></a> 
                                              </td>-->
                                            </tr>
                                          {% endfor %}
                                        </tbody>
                                      </table>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card card-user">
                            <div class="image">
<!--                                <img src="https://ununsplash.imgix.net/photo-1431578500526-4d9613015464?fit=crop&fm=jpg&h=300&q=75&w=400" alt="..."/>-->
                            </div>
                            <div class="content">
                                <div class="author">
                                     <a href="#">
                                    <img class="avatar border-gray" src="/images/face-0.jpg" alt="..."/>

                                      <h4 class="title">{{ user.fullname }}<br />
                                         <small>{{ user.email }}</small>
                                      </h4>
                                    </a>
                                </div><br>
                                <!--<p class="description text-center">
                                    Singles: {{ singles_count }}<br>
                                    Albums: {{ albums_count }}<br>
                                    Videos: {{ videos_count }}
                                </p>-->
                            </div>
                            <hr>
                            <div class="text-center">
                                <!--<button href="#" class="btn btn-simple"><i class="fa fa-facebook-square"></i></button>
                                <button href="#" class="btn btn-simple"><i class="fa fa-twitter"></i></button>
                                <button href="#" class="btn btn-simple"><i class="fa fa-google-plus-square"></i></button>-->
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
	
{% endblock %}

{% block script %}

{% endblock %}