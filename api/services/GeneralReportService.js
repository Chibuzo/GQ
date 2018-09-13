module.exports = {
    updateField: function(field, action = 'add') {
        let sql;
        if (action === 'add')
            sql = `UPDATE userstatistics SET ${field} = ${field} + 1`;
        else
            sql =  `UPDATE userstatistics SET ${field} = ${field} - 1`;

        UserStatistics.query(sql, function(err) {});    
    }
}