      var $= jQuery.noConflict();

      //SUBMIT LEVEL FORM -START

      $('body').delegate('.playButton','click',function(){

           let level=$(this).attr('id'); //LEVEL 

           if (level==1) {

               let email=$('#email'+level).val();//EMAIL ID
               if (!validateEmail(email)) { //VALIDATE EMAIL ID
                  alert('Enter valid email address');
                  return false;
                }

                 $('.playButton').prop( "disabled", true ); //BUTTON DISABLED

                // SEND DATA TO SERVER
                $.post( "http://render4.selfanimate.com/xmas/backend/home/save_level", { level: level,email:email , uid:123 })
                  .done(function( response ) {
                     //var obj= $.parse(response);
                     var json_obj = $.parseJSON(response);//parse JSON
                     //console.log(json_obj);
                     if (json_obj.status=='success') {
                        alert('unlocked');
                        if (level==1) {
                          $('#email'+level).val('')
                        }
                     }else if (json_obj.status=='unsuccess') {
                       alert('something went wrong please try again');
                       if (level==1) {
                          $('#email'+level).val('')
                        }
                     }

                }).fail(function() {
                      alert('something went wrong please try again');

                })
                .always(function() {
                      
                });

                 $('.playButton').prop( "disabled", false ); //BUTTON DISABLED


           }else{

              $('.playButton').prop( "disabled", true ); //BUTTON DISABLED

              // SEND DATA TO SERVER
              $.post( "http://render4.selfanimate.com/xmas/backend/home/save_level", { level: level})
                .done(function( response ) {
                   //var obj= $.parse(response);
                   var json_obj = $.parseJSON(response);//parse JSON
                   //console.log(json_obj);
                   if (json_obj.status=='success') {
                      alert('unlocked');
                   }else if (json_obj.status=='unsuccess') {
                    alert('something went wrong please try again');
                    
                   }

              }).fail(function() {
                    alert('something went wrong please try again');
              })
              .always(function() {
                   // alert('something went wrong please try again');
              });

              $('.playButton').prop( "disabled", false ); //BUTTON DISABLED


           }


          

      });

      //SUBMIT LEVEL FORM -START


      /**
      * VALIDATE EMAIL ID
      * @param email string
      */


      function validateEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }