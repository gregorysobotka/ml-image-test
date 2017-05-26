
function mainController($scope, $http) {

    $scope.images = [],
    $scope.predictionsByTag = [],
    $scope.uniqueTags = new Set(),
    $scope.userId = 1;

    $scope.updateUser = function(userId){
        console.log('userId change to ' + userId);
        $scope.userId = userId;
        loadPredictions();
    };

    loadPredictions(); // loads page

    function loadPredictions(){

        $scope.uniqueTags.clear();

        $http.get('/images/location/seattle')
            .success(function(data) {

                // Build unique list of tags
                data.destination.map((destination) => {
                    destination.tags.map((tag) => {
                        $scope.uniqueTags.add(tag);
                    });
                });



                // Iterate over each tag and get predictions for each
                $scope.uniqueTags.forEach(function(tag){
                    getSinglePrediction(tag, function(prediction){
                        $scope.predictionsByTag[tag] = prediction;
                    });
                });

                setTimeout(function(){
                    var evaluatedDestinations = data.destination.map((destination) => {
                        destination.totalScore = 0;

                        let tagsLength = destination.tags.length;

                        destination.tags.map((tag) => {

                            let tagPrediction = $scope.predictionsByTag[tag];

                            if(tagPrediction.hasOwnProperty(1)) {

                                if(tagPrediction[1] > destination.score){
                                    destination.score = tagPrediction[1];
                                }

                                destination.totalScore = destination.totalScore + tagPrediction[1];

                            }

                            if(tagPrediction.hasOwnProperty(0) && tagPrediction[0] > destination.lowScore){
                                destination.totalScore = destination.totalScore - tagPrediction[0];
                                destination.lowScore = tagPrediction[0];
                            }

                        });

                        destination.totalScore = ( destination.totalScore / tagsLength );

                        destination.score = destination.score;
                        return destination;

                    });

                    $scope.images = evaluatedDestinations;
                    changeSort('totalScore');

                }, 1000);

            })
            .error(function(data) {

            });

    }

    $scope.changeSort = changeSort;

    function getSinglePrediction(tag, cb){
        $http.get('/prediction/'+tag+'?uid='+$scope.userId)
            .success(function(data) {
                return cb(data.Prediction.predictedScores);
            })
            .error(function(data) {
                return cb(0)
            });
    }

    function changeSort(sortBy){

        $scope.images = $scope.images.sort(function(a,b){
            return b[sortBy]-a[sortBy];
        });

        $scope.$apply();

    }

}

