{% extends 'layout.swig' %}
{% set title = 'Admin Dashboard' %}
{% block page_title %}
  <i class="pe-7s-graph"></i> Dashboard
{% endblock %}
{% block body %}
<style>
.widget-box {
  padding: 11px;
  border: #e0e0e0 solid thin;
  margin: 10px;
  margin-top: 0;
  overflow: auto;
  background: #fff;
}

.widget-box i {
    font-size: 45px;
    margin-top: 15px;
}

.widget-box h3 {
  margin: 5px;
}
</style>  
<div class="col-md-12">

  <div class="row" style="margin-top: 40px">
      <div class="col-md-4">
          <div class="card">
              <div class="header">
                  <h4 class="title">Content Statistics</h4>
                  <p class="category">Current Comparism</p>
              </div>
              <div class="content">
                  <div id="chartPreferences" class="ct-chart ct-perfect-fourth"></div>

                  <div class="footer">
                      <div class="legend">
                          <i class="fa fa-circle text-info"></i> One
                          <i class="fa fa-circle text-danger"></i> Another
                          <i class="fa fa-circle text-warning"></i> Ahaa
                      </div>
                      <hr>
                      <div class="stats">
                          <i class="fa fa-clock-o"></i> Recent Activities
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div class="col-md-8">
          <div class="card">
              <div class="header">
                  <h4 class="title">Recent Contents</h4>
                  <p class="category">In a bit...</p>
              </div>
              <div class="content table-responsive table-full-width">
                  <table class="table table-striped hidden">
                      <thead>
                          <tr>
                              <th>CONTENT TITLE</th>
                              <th>TYPE</th>
                              <th>ARTIST</th>
                              <th>GENRE</th>
                              <th>SALES START DATE</th>
                              <th></th>
                          </tr>
                      </thead>
                      <tbody>
                          {% for content in  contents %}
                              <tr>
                                  <td>{{ content.title }}</td>
                                  <td>{{ content.type }}</td>
                                  <td>{{ content.artist }}</td>
                                  <td>{{ content.genre }}</td>
                                  <td>{{ content.sales_date | date('d M Y') }}</td>
                                  <td class="text-center"><a href="/{{ content.type }}/{{ content.id }}" rel="tooltip" title="View Content"><i class='fa fa-eye'></i></a></td>
                              </tr>
                          {% endfor %}    
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
  </div>
</div>

{% endblock %}

{% block scriptTag %}
<script src="/js/chartist.min.js"></script>
{% endblock %}

{% block script %}
$(function() {
  var optionsPreferences = {
      donut: true,
      donutWidth: 40,
      startAngle: 0,
      total: 100,
      showLabel: false,
      axisX: {
          showGrid: false
      }
  };
  
  Chartist.Pie('#chartPreferences', {}, optionsPreferences);
  
  var sum = {{ s_count }} + {{ a_count }} + {{ v_count }};
  var series = [];
  series.push(({{ s_count }} / sum) * 100);
  series.push(({{ a_count }} / sum) * 100);
  series.push(({{ v_count }} / sum) * 100);
        
  Chartist.Pie('#chartPreferences', {
    labels: ['', '', ''],
    series: series
  });
})
{% endblock %}