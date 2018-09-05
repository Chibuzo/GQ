module.exports = {
    updateField: function(field, action = 'add') {
        let sql;
        if (action === 'add')
            sql = `UPDATE ${field} SET ${field} = ${field} + 1`;
        else
            sql =  `UPDATE ${field} SET ${field} = ${field} - 1`;

        UserStatistics.query(sql, function(err) {});    
    }
}