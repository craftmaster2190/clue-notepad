var app = angular.module('app', ['ngCookies']);

app.controller('clueCtrl', ['$scope', '$cookieStore', '$interval', function (
  $scope, $cookieStore, $interval) {

  //Get cookie if available or just return default value
  $scope.getCookie = function (key, def) {
    var temp = $cookieStore.get(key);
    if (angular.isDefined(temp))
      return temp;
    return def;
  };

  //Initialize variables
  $scope.isGameStarted = $scope.getCookie("isGameStarted", false);
  $scope.players = $scope.getCookie("players", 4);
  $scope.suspects = $scope.getCookie("suspects", []);
  $scope.weapons = $scope.getCookie("weapons", []);
  $scope.rooms = $scope.getCookie("rooms", []);

  // Update cookies every 3 seconds

  $interval(function () {
    updateCookies();
  }, 3000);


  //Place current values of variables in cookie store
  function updateCookies() {
    $cookieStore.put("isGameStarted", $scope.isGameStarted);
    $cookieStore.put("players", $scope.players);
    $cookieStore.put("suspects", $scope.suspects);
    $cookieStore.put("weapons", $scope.weapons);
    $cookieStore.put("rooms", $scope.rooms);
  };

  $scope.showAllSuspects = false;

  function hideSuspect(suspect) {
    angular.forEach($scope.suspects, function (suspect) {
      if (suspect.name == item.name)
        suspect.visible = true;
      else
        suspect.visible = false;
    });
    $scope.showAllSuspects = true;
  }
  $scope.selectItem = function (item, id) {
    // put this in a function
    item.classID[id] = (item.classID[id] == 3 ? 1 : item.classID[id] + 1);
  }
  $scope.selectSuspect = function (group, playerId) {
    changeThisButton(group, playerId);
  }

  $scope.restoreSuspect = function () {
    angular.forEach($scope.suspects, function (suspect) {
      suspect.visible = true;
    });
    $scope.showAllSuspects = false;
  }
  $scope.changeWeapon = function (group, id) {
    changeThisButton(group, id);
  }
  $scope.changeRoom = function (group, id) {
      changeThisButton(group, id);
    }
    //Rotate button icons
  function changeThisButton(group, id) {
    group.classID[id] = (group.classID[id] == 5 ? 1 : group.classID[id] + 1);
  }

  $scope.getItemBtnClass = function (classID) {
    if (classID == 1)
      return "btn btn-default";
    else if (classID == 2)
      return "btn btn-success";
    else if (classID == 3)
      return "btn btn-danger";
    else
      return "btn btn-info";
  }
  $scope.getItemSpanClass = function (classID) {
      if (classID == 1)
        return "glyphicon glyphicon-question-sign glyphicon-none";
      else if (classID == 2)
        return "glyphicon glyphicon-ok-sign";
      else if (classID == 3)
        return "glyphicon glyphicon-remove-sign";
      else
        return "glyphicon glyphicon-bullhorn";
    }
    //Return a button class based on classID value of button
  $scope.getBtnClass = function (classID) {
    if (classID == 1)
      return "btn btn-default";
    else if (classID == 2)
      return "btn btn-info";
    else if (classID == 3)
      return "btn btn-info";
    else if (classID == 4)
      return "btn btn-success";
    else
      return "btn btn-danger";
  }

  //Return a gylphicon class based on classID value of button
  $scope.getSpanClass = function (classID) {
    if (classID == 1)
      return "glyphicon glyphicon-question-sign glyphicon-none";
    else if (classID == 2)
      return "glyphicon glyphicon-comment";
    else if (classID == 3)
      return "glyphicon glyphicon-bullhorn";
    else if (classID == 4)
      return "glyphicon glyphicon-eye-open";
    else
      return "glyphicon glyphicon-remove-sign";
  }

  //Add a new blank character
  $scope.addCharacter = function () {
    $scope.suspects.push({
      name: ""
    });
  };

  //Add a new blank weapon
  $scope.addWeapon = function () {
    $scope.weapons.push({
      name: "",
      visible: true
    });
  }

  //Add a new blank room
  $scope.addRoom = function () {
    $scope.rooms.push({
      name: "",
      visible: true
    })
  }

  //Scope wrapper of splice function
  //Used for removing characters, weapons and rooms
  $scope.spliceArray = function (arr, idx) {
    arr.splice(idx, 1);
  }

  //Change game state
  //Initialize blank array data to be used for note buttons
  $scope.startGame = function () {
    $scope.isGameStarted = true;
    angular.forEach($scope.suspects, function (group) {
      generateDefaultData(group, false);
    });
    $scope.suspects.sort(function (lhs, rhs) {
      return lhs.name.localeCompare(rhs.name);
    });
    angular.forEach($scope.weapons, function (group) {
      generateDefaultData(group, false);
    });
    $scope.weapons.sort(function (lhs, rhs) {
      return lhs.name.localeCompare(rhs.name);
    });
    angular.forEach($scope.rooms, function (group) {
      generateDefaultData(group, false);
    });
    $scope.rooms.sort(function (lhs, rhs) {
      return lhs.name.localeCompare(rhs.name);
    });
  }

  //Show bootstrap modal asking if ok to pause game
  $scope.tryEndGame = function () {
    $('#endGameModal').modal('toggle')
  }

  //Actually end game
  $scope.endGame = function () {
    $scope.isGameStarted = false;
  }

  //Generate default data if there is none
  //If force is truthy, then generate data regardless of if there is any
  function generateDefaultData(group, force) {
    if (angular.isDefined(group.classID) && !force)
      return;
    group.classID = [];
    for (i = 0; i <= $scope.players; i++) {
      group.classID.push(1);
    }
  }

  //Init Office Clue values
  $scope.initOffice = function () {
    $scope.suspects = [{
      name: 'Jim',
      visible: true
    }, {
      name: 'Stanley',
      visible: true
    }, {
      name: 'Dwight',
      visible: true
    }, {
      name: 'Pam',
      visible: true
    }, {
      name: 'Angela',
      visible: true
    }, {
      name: 'Andy',
      visible: true
    }];

    $scope.weapons = [{
      name: 'Poisoned Pretzel',
      visible: true
    }, {
      name: 'Dundee Trophy',
      visible: true
    }, {
      name: 'Bacon Grill',
      visible: true
    }, {
      name: 'Bicycle Chain',
      visible: true
    }, {
      name: 'Mr. A. Knife',
      visible: true
    }, {
      name: 'Ream of Paper',
      visible: true
    }, {
      name: 'Nunchucks',
      visible: true
    }, {
      name: 'World\'s Best Boss Coffee',
      visible: true
    }, {
      name: 'Rabid Bat',
      visible: true
    }];

    $scope.rooms = [{
      name: 'Parking Lot',
      visible: true
    }, {
      name: 'Michael\'s Office',
      visible: true
    }, {
      name: 'Conference Room',
      visible: true
    }, {
      name: 'Break Room',
      visible: true
    }, {
      name: 'Reception',
      visible: true
    }, {
      name: 'Warehouse',
      visible: true
    }, {
      name: 'Accounting',
      visible: true
    }, {
      name: 'Annex',
      visible: true
    }, {
      name: 'Kitchen',
      visible: true
    }];
  }

  //Init Classic Clue values
  $scope.initClassic = function () {
    $scope.suspects = [{
      name: 'Colonel Mustard',
      visible: true
    }, {
      name: 'Professor Plum',
      visible: true
    }, {
      name: 'Mr. Green',
      visible: true
    }, {
      name: 'Mrs. Peacock',
      visible: true
    }, {
      name: 'Mrs. Scarlet',
      visible: true
    }, {
      name: 'Mrs. White',
      visible: true
    }];

    $scope.weapons = [{
      name: 'Knife',
      visible: true
    }, {
      name: 'Candlestick',
      visible: true
    }, {
      name: 'Revolver',
      visible: true
    }, {
      name: 'Rope',
      visible: true
    }, {
      name: 'Lead Pipe',
      visible: true
    }, {
      name: 'Wrench',
      visible: true
    }];

    $scope.rooms = [{
      name: 'Hall',
      visible: true
    }, {
      name: 'Lounge',
      visible: true
    }, {
      name: 'Dining Room',
      visible: true
    }, {
      name: 'Kitchen',
      visible: true
    }, {
      name: 'Ballroom',
      visible: true
    }, {
      name: 'Conservatory',
      visible: true
    }, {
      name: 'Billiard Room',
      visible: true
    }, {
      name: 'Library',
      visible: true
    }, {
      name: 'Study',
      visible: true
    }];
  }

  //Init a blank Clue board
  $scope.initBlank = function () {
    $scope.suspects = [];
    $scope.weapons = [];
    $scope.rooms = [];
    for (i = 0; i < 6; i++) {
      $scope.addCharacter();
      $scope.addWeapon();
      $scope.addRoom();
    };
  }

  //Display Bootstrap modal to confirm ok to clear all values
  $scope.tryClearValues = function () {
    $('#clearValuesModal').modal('toggle')
  }

  //Actually clear all values
  $scope.clearValues = function () {
    angular.forEach($scope.suspects, function (group) {
      generateDefaultData(group, true);
    });
    angular.forEach($scope.weapons, function (group) {
      generateDefaultData(group, true);
    });
    angular.forEach($scope.rooms, function (group) {
      generateDefaultData(group, true);
    });
    //toastr.info("All note data was reset");
  }

  //Display Bootstrap modal to confirm ok to delete everything
  $scope.tryDeleteValues = function () {
    $('#deleteValuesModal').modal('toggle')
  }

  //Actually delete everything
  $scope.deleteValues = function () {
    //toastr.error("Game over!", "All data was deleted");
    $scope.suspects = [];
    $scope.weapons = [];
    $scope.rooms = [];
  }

  //Generate a blank array, used to trick data-ng-repeat when array values need not be recorded
  $scope.generateArrayByLength = function (length) {
    return new Array(length);
  }

  //Show a toast when player is about to do something that will clear note data
  $scope.warnChangeSettings = function () {
    //toastr.warning("Changing this setting will delete all note data", "Warning");
  }

  //Change the number of players and reset notes
  $scope.setNumberOfPlayers = function (num) {
    $scope.players = num;
    $scope.clearValues();
  }
}]);