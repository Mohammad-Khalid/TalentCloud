(function () {
    'use strict';

    angular
        .module('myApp')
        .factory('UserService', UserService);

    UserService.$inject = ['$http', 'serviceUrl'];

    function UserService($http, serviceUrl) {
        var service = {};

        service.GetAll = GetAll;
        service.GetById = GetById;
        service.GetByUsername = GetByUsername;
        service.Create = Create;
        service.Update = Update;
        service.Delete = Delete;
        service.createOrganizatin = createOrganizatin;
        service.adminLogin = adminLogin;
        service.getAllOrganization = getAllOrganization;
        service.editOrganizatin = editOrganizatin;
        service.updateOrganization = updateOrganization;
        service.deleteOrganization = deleteOrganization;
        service.getStudent = getStudent;
        service.studentEdit = studentEdit;
        service.submitEditStudent = submitEditStudent;
        service.deleteStudent = deleteStudent;
        service.membrLogin = membrLogin;
        service.getTeacher = getTeacher;
        service.deleteTeacher = deleteTeacher;
        service.submitEditTeacher = submitEditTeacher;

        $http.defaults.headers.post["Content-Type"] = "application/json";
        return service;

        function GetAll() {
            return $http.get('/api/users').then(handleSuccess, handleError('Error getting all users'));
        }

        function GetById(id) {
            console.log("GetById");
            return $http.get('/api/users/' + id).then(handleSuccess, handleError('Error getting user by id'));
        }

        function GetByUsername(username) {
            return $http.get('/api/users/' + username).then(handleSuccess, handleError('Error getting user by username'));
        }
        function getStudent(){
            return $http.get(serviceUrl + '/student').then(handleSuccess, handleError('Error While accessing student'));
        }
        function getTeacher(){
            alert("hiiiiiiiiiiii");
            return $http.get(serviceUrl + '/teacher').then(handleSuccess, handleError('Error While accessing teacher'));
        }
        function Create(user) {
            /*alert(JSON.stringify(user));*/
            return $http.post(serviceUrl + '/login', user).then(handleSuccess, handleError('Error creating user'));
        }

        function adminLogin(user) {
            /*alert(JSON.stringify(user));*/
            return $http.post(serviceUrl + '/adminLogin', user).then(handleSuccess, handleError('Error While Admin Login'));
        }
        function membrLogin(user)
        {
            return $http.post(serviceUrl + '/login', user).then(handleSuccess, handleError('Error While Member Login'));
        }
        function createOrganizatin(org) {
            return $http.post(serviceUrl + '/organization', org).then(handleSuccess, handleError('Error While creating organization'));
        }

        function getAllOrganization() {
            return $http.get(serviceUrl + '/organization').then(handleSuccess, handleError('Error While accessing organization'));
        }

        function editOrganizatin(org_id) {
            console.log(org_id + "************");
            return $http.get(serviceUrl + '/organization/' + org_id).then(handleSuccess, handleError('Error While accessing organization'));
        }

        function updateOrganization(org) {
            return $http.put(serviceUrl + '/organization', org).then(handleSuccess, handleError('Error While updating organization'));
        }
        function deleteOrganization(org_id){
            console.log(org_id +"&&&&&&&");
             return $http.delete(serviceUrl + '/organization/'+org_id).then(handleSuccess, handleError('Error While deleting organization'));
        }
        function deleteStudent(id){
             return $http.delete(serviceUrl + '/student/'+id).then(handleSuccess, handleError('Error While deleting student'));
        }
        function deleteTeacher(id){
             return $http.delete(serviceUrl + '/teacher/'+id).then(handleSuccess, handleError('Error While deleting teacher'));
        }
        function studentEdit(ID){
            return $http.get(serviceUrl + '/student/'+ID).then(handleSuccess, handleError('Error While accessing organization'));
        }
        function submitEditStudent(formdata,obj){
            formdata.append("stud",obj);
            return $http.put(serviceUrl + '/student', formdata).then(handleSuccess, handleError('Error While updating student'));
        }
        function submitEditTeacher(formdata,obj){
            formdata.append("stud",obj);
            return $http.put(serviceUrl + '/teacher', formdata).then(handleSuccess, handleError('Error While updating teacher'));
        }
        function Update(user){
            return $http.put('/api/users/' + user.id, user).then(handleSuccess, handleError('Error updating user'));
        }

        function Delete(id) {
            return $http.delete('/api/users/' + id).then(handleSuccess, handleError('Error deleting user'));
        }

        // private functions

        function handleSuccess(res) {
            console.log(res);
            return res.data;
        }

        function handleError(error) {
            return function () {
                return {
                    success: false,
                    message: error
                };
            };
        }
    }

})();