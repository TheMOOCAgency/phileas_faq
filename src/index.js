/*import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable'*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NewApp from './NewApp';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { orange } from '@material-ui/core/colors';

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#5cb7d8',
        },
        secondary: orange,
    },
    background: "#5cb7d8"
});

/* Début du rendu *********************************************** */


window.lang = 'en';
window.props = {"fr": [], "en": [      {
         "content":[
            {
               "content":[
                  {
                     "namequestion":"Question",
                     "question":"How to add content ?",
		     "questionId" : "q1",
                     "response":"<p><span style=\"color: rgb(53, 152, 219);\" data-mce-style=\"color: #3598db;\"><strong>Lorem</strong></span> ipsum dolor sit amet, consectetur adipiscing elit. Fusce in \nvenenatis nunc. Nam ut lacus ut est auctor commodo. Mauris vulputate \ndiam sit amet eros <em>interdum cursus</em>. Fusce dui justo, hendrerit \nscelerisque ligula quis, pharetra dignissim lectus. Duis vulputate <strong>eu \ndolor eget ullamcorper</strong>. </p>"
                  },
                  {
                     "namequestion":"Question",
                     "question":"How to show content ?",
		     "questionId" : "q1_2",
                     "response":"<p><span style=\"color: rgb(53, 152, 219);\" data-mce-style=\"color: #3598db;\"><strong>Lorem</strong></span> ipsum dolor sit amet, consectetur adipiscing elit. Fusce in \nvenenatis nunc. Nam ut lacus ut est auctor commodo. Mauris vulputate \ndiam sit amet eros <em>interdum cursus</em>. Fusce dui justo, hendrerit \nscelerisque ligula quis, pharetra dignissim lectus. Duis vulputate <strong>eu \ndolor eget ullamcorper</strong>. </p><p><span style=\"color: rgb(53, 152, 219);\" data-mce-style=\"color: #3598db;\"><strong><br data-mce-bogus=\"1\"></strong></span></p><p><span style=\"color: rgb(53, 152, 219);\" data-mce-style=\"color: #3598db;\"><strong>Ipsum</strong></span> ipsum dolor sit amet, consectetur adipiscing elit. Fusce in \nvenenatis nunc. Nam ut lacus ut est auctor commodo. Mauris vulputate \ndiam sit amet eros <em>interdum cursus</em>. Fusce dui justo, hendrerit \nscelerisque ligula quis, pharetra dignissim lectus. Duis vulputate <strong>eu \ndolor eget ullamcorper</strong>. </p>"
                  }
               ],
               "nameSubTopic":"Content management"
            },
            {
               "content":[
                  {
                     "namequestion":"Question",
                     "question":"How to see my FAQ ?",
		     "questionId" : "q2",
                     "response":"<p><span style=\"color: rgb(53, 152, 219);\" data-mce-style=\"color: #3598db;\"><strong>Lorem</strong></span> ipsum dolor sit amet, consectetur adipiscing elit. Fusce in \nvenenatis nunc. Nam ut lacus ut est auctor commodo. Mauris vulputate \ndiam sit amet eros <em>interdum cursus</em>. Fusce dui justo, hendrerit \nscelerisque ligula quis, pharetra dignissim lectus. Duis vulputate <strong>eu \ndolor eget ullamcorper</strong>. </p><p><span style=\"color: rgb(53, 152, 219);\" data-mce-style=\"color: #3598db;\"><strong><br data-mce-bogus=\"1\"></strong></span></p><p><span style=\"color: rgb(53, 152, 219);\" data-mce-style=\"color: #3598db;\"><strong>Ipsum</strong></span> ipsum dolor sit amet, consectetur adipiscing elit. Fusce in \nvenenatis nunc. Nam ut lacus ut est auctor commodo. Mauris vulputate \ndiam sit amet eros <em>interdum cursus</em>. Fusce dui justo, hendrerit \nscelerisque ligula quis, pharetra dignissim lectus. Duis vulputate <strong>eu \ndolor eget ullamcorper</strong>. </p>"
                  },
                  {
                     "namequestion":"Question",
                     "question":"Where to see my FAQ ?",
		     "questionId" : "q3",
                     "response":"<p><span style=\"color: rgb(53, 152, 219);\" data-mce-style=\"color: #3598db;\"><strong>Ipsum</strong></span> ipsum dolor sit amet, consectetur adipiscing elit. Fusce in \nvenenatis nunc. Nam ut lacus ut est auctor commodo. Mauris vulputate \ndiam sit amet eros <em>interdum cursus</em>. Fusce dui justo, hendrerit \nscelerisque ligula quis, pharetra dignissim lectus. Duis vulputate <strong>eu \ndolor eget ullamcorper</strong>. </p>"
                  }
               ],
               "nameSubTopic":"Displaying content"
            }
         ],
         "nameTopic":"Administration",
         "idTopic":"",
         "icon":"https://img2.freepng.fr/20180602/sga/kisspng-faq-computer-icons-question-information-de-hart-pl-5b133c166383a3.4039153315279872224076.jpg"
      },
      {
         "content":[
            {
               "content":[
                  {
                     "namequestion":"Question",
                     "question":"My first question ?",
		"questionId" : "q4",
                     "response":"<p><span style=\"color: rgb(53, 152, 219); font-size: 18pt;\" data-mce-style=\"color: #3598db; font-size: 18pt;\"><strong>Fusce ?</strong></span> </p><p>convallis sit amet nisl in lobortis. Vivamus elementum, ex et \nlaoreet tincidunt, sapien metus pretium nunc, ut consequat arcu sapien \nid enim. Integer ultrices risus ipsum, nec sagittis risus auctor vitae. \nDonec a luctus tortor, nec dapibus augue. Aenean ut tincidunt velit. </p>"
                  },
                  {
                     "namequestion":"Question",
                     "question":"Question",
		"questionId" : "q5",
                     "response":"<p><span style=\"color: rgb(53, 152, 219); font-size: 18pt;\" data-mce-style=\"color: #3598db; font-size: 18pt;\"><strong>Fusce</strong></span> convallis sit amet nisl in lobortis. Vivamus elementum, ex et \nlaoreet tincidunt, sapien metus pretium nunc, ut consequat arcu sapien \nid enim. Integer ultrices risus ipsum, nec sagittis risus auctor vitae. \nDonec a luctus tortor, nec dapibus augue. Aenean ut tincidunt velit. </p><p><span style=\"color: rgb(53, 152, 219); font-size: 18pt;\" data-mce-style=\"color: #3598db; font-size: 18pt;\"><strong>Convallis ! </strong></span></p><p>Convallis sit amet nisl in lobortis. Vivamus elementum, ex et \nlaoreet tincidunt, sapien metus pretium nunc, ut consequat arcu sapien \nid enim. Integer ultrices risus ipsum, nec sagittis risus auctor vitae. \nDonec a luctus tortor, nec dapibus augue. Aenean ut tincidunt velit. </p>"
                  }
               ],
               "nameSubTopic":"My first sub Topic"
            },
            {
               "content":[

               ],
               "nameSubTopic":"SubTopicName"
            }
         ],
         "nameTopic":"My FAQ",
         "idTopic":"",
         "icon":"https://banner2.kisspng.com/20180612/ulg/kisspng-computer-icons-document-file-format-5b1f61c6ce8c65.288896421528783302846.jpg"
      },
      {
         "content":[
            {
               "content":[
                  {
                     "namequestion":"Question",
                     "question":"Where to find information",
			"questionId" : "q6",
                     "response":"<p>Cras ultrices volutpat tortor, eget elementum leo congue volutpat. Etiam\n fermentum justo id orci molestie, tincidunt lobortis enim porta. </p>"
                  }
               ],
               "nameSubTopic":"One topic for my rule"
            },
            {
               "content":[

               ],
               "nameSubTopic":"SubTopicName"
            }
         ],
         "nameTopic":"Location",
         "idTopic":"",
         "icon":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrKOWCl_nCzd72MuD3jBo4qrAIHLYrNKR7gA5sp9YVwzMYItDU"
      },
      {
         "content":[
            {
               "content":[
                  {
                     "namequestion":"Question",
                     "question":"Example Question ?",
			"questionId" : "q7",
                     "response":""
                  }
               ],
               "nameSubTopic":"Example Sub-topic"
            }
         ],
         "nameTopic":"Last Topic !",
         "idTopic":"",
         "icon":"https://i7.pngguru.com/preview/906/5/129/telephone-call-email-computer-icons-clip-art-business-card-topic.jpg"
      }]}
      ReactDOM.render(
          <ThemeProvider theme={theme}>
              <CssBaseline />
              <NewApp data={window.props} lang={window.lang}/>
          </ThemeProvider>
          ,document.getElementById('root')
      );
