module.exports = {
    saveTest: function (tests) {
        var n = 0;
        tests.records.forEach(function(test) {
            TestCategory.findOrCreate({ category: test.category }, { category: test.category }).exec(function(err, cat) {
                if (err) return console.log(err);

                var data = {
                    test_id: test.test_id,
                    test_name: test.test_name,
                    coverage: test.coverage,
                    total_questions: test.total_questions,
                    duration: test.duration,
                    pass_mark: test.passing_marks,
                    category: cat.id
                };
                CBTTest.create(data).exec(function (err) {
                    console.log(err);
                });
            });
        });
    }
}