$scope.postJob = function(ev) {
              $mdDialog.show({
                controller: postJobCtrl,
                templateUrl: 'app/partials/post.job.modal.html',
                targetEvent: ev,
                clickOutsideToClose: true,
                escapeToClose: true
              })
              .then(function() {
                });
            };
            function postJobCtrl($scope, $mdDialog) {
              $scope.cancel = function() {
                $mdDialog.cancel();
              };
              $scope.hideProg = true;
              $scope.submitJob = function() {
                $scope.hideProg = false;
                var formData = {
                    title: $scope.title,
                    description: $scope.description,
                    tools: $scope.tools,
                    skill: $scope.skill
                  };
                  $timeout(function() {
                    JobService.postJob(formData)
                      .then(
                        function(data) {
                          $scope.hideProg = true;
                          ToastService.showToast('Job posted successfully');
                         },
                        function(data) {
                        $scope.hideProg = true;
                        $scope.msg = data.message;
                        ToastService.showToast('Job posting failed');
                      });
                  $mdDialog.hide();
                  }, 3000);
              };
            }
