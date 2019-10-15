/*import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable'*/
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import icon from './icon.png';
import icon1 from './icon/icon1.svg';
import icon2 from './icon/icon2.svg';
import icon3 from './icon/icon3.svg';
import Icon from '@material-ui/core/Icon';

class App extends React.Component { //Début app ***************************************************************************
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleLanguage = this.handleLanguage.bind(this)
        this.state = {
            topicOnScreen: 'faq',
            language: 'fr',
            search: ''
        }
    }
    //eventHandler ********************************************************
    handleClick(id) {
        this.setState({ topicOnScreen: id })
        this.setState({ search: '' })
    }
    handleSearch(keyword) {
        this.setState({ search: keyword })
    }
    handleLanguage(lang) {
        this.setState({ language: lang })
    }

    render() {
        /* Gestion de la langue détection automatique du nombre de langue et attribution d'un index pour chacune **** */
        /*let languageIndex = {};
        this.props.data.forEach((lData, index) => {
            languageIndex[lData.language] = index
        })
         Gestion des données et du nombre de topic maximal  ***************************************************** */
        const data = this.props.data['en'];
        let dataArray = [];
        let dataArrayOriginal = [];
        if (4 < data.length) {
            dataArray = data.slice(0, 4)
            dataArrayOriginal = data.slice(0, 4)
        } else {
            dataArray = data
        }
        const topics = {};
        dataArray.forEach((topic, index) => {
            topics[topic.nameTopic] = index
        });

        /*Gestion de la barre de de recherche ******************************************************************** */
        if ('' === this.state.search) {
            if (dataArray[topics[this.state.topicOnScreen]]) {
                dataArray = dataArray[topics[this.state.topicOnScreen]]
            } else {
                dataArray = dataArray[0];

            }
        }

        return (
            <div className="main">
                <div className="contentWrapper">
                    <SearchFilter data={dataArrayOriginal} onScreen={this.state.topicOnScreen} handleChangeState={this.handleClick} searchKeyword={this.state.search} handleSearchBar={this.handleSearch} />
                    <ContentFaq data={dataArray} searchKeyword={this.state.search} />
                </div>
            </div>
        );
    }
}

/*Composant de gestion de la barre de recherche et du menu de topics ************************************/
class SearchFilter extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputSearch = this.handleInputSearch.bind(this)
    }
    /* Event handler de la barre de recherche */
    handleInputSearch(e){
        this.props.handleSearchBar(e.target.value)
    }
    handleSelectedTopic(e){
        if (e.target.tagName === "LI") {
            for (let i = 0; i < e.target.parentNode.children.length; i++) {
                e.target.parentNode.children[i].children[0].classList.remove('selected')
            }
            e.target.children[0].classList.add("selected")
        } else {
            for (let i = 0; i < e.target.parentNode.parentNode.children.length; i++) {
                e.target.parentNode.parentNode.children[i].children[0].classList.remove('selected')
            }
            e.target.parentNode.children[0].classList.add("selected")
        }
        (function(){
            for (let a = 0; a < document.getElementsByClassName('question').length; a++) {
                var element = document.getElementsByClassName('question')[a].nextSibling
                element.style.maxHeight = '0px'
            }
        })()
    }
    componentDidMount() {
        document.getElementsByClassName('topic')[0].children[0].classList.add('selected')
    }
    render() {
        const data = this.props.data;
        const topics = [];
        data.forEach((topic)=>{
            if (data[0].nameTopic === topic.nameTopic){
                topics.push(
                    <li key={topic.nameTopic} className="topic" onClick={e => {
                        this.props.handleChangeState(topic.nameTopic);
                        this.handleSelectedTopic(e)
                    }}>
                        <img alt={topic.nameTopic} className="selected" src={topic.icon} />
                        <p>{topic.nameTopic}</p>
                    </li>
                )
            }else{
                topics.push(
                    <li key={topic.nameTopic} className="topic" onClick={e=>{
                        this.props.handleChangeState(topic.nameTopic);
                        this.handleSelectedTopic(e)
                    }}>
                        <img alt={topic.nameTopic} src={topic.icon} />
                        <p>{topic.nameTopic}</p>
                    </li>
                )
            }
        })
        return (
            <div className="search">
                <div className="searchBar">
                    <form>
                        <input type="text" placeholder="Rechercher" value={this.props.searchKeyword} onChange={e => {
                            this.handleInputSearch(e);
                            }} />
                    </form>
                </div>
                <ul className="topicMenu">
                    {topics}
                </ul>
            </div>
        );
    }
}


/* Composant de gestion des topics *************************************************************** */
class ContentFaq extends React.Component {
    render() {
        const datas = this.props.data;
        const arrayDataToSend = [];
        if ('' !== this.props.searchKeyword) {
            datas.forEach((data,i) => {
                data.content.forEach((topics,i) => {
                    //ici

                    topics.content.forEach((topic,a) => {
                        if (topic.question.toLowerCase().indexOf(this.props.searchKeyword.toLowerCase()) !== -1) { //Erreur d'index, voire optimisation
                            arrayDataToSend.push(
                                <div key={data.nameTopic + topic.nameQuestion + '_' +a}>
                                    <SubContent nameTopic={data.nameTopic} data={topic} onSearch={true} searchKeyword={this.props.searchKeyword} />
                                </div>
                            )
                        }
                        else if (topic.response.indexOf(this.props.searchKeyword) !== -1) {
                            arrayDataToSend.push(
                                <div>
                                    <SubContent nameTopic={data.nameTopic} data={topic} onSearch={true} searchKeyword={this.props.searchKeyword} />
                                </div>
                            )
                        }
                    })
                })
            })


        } else {
            datas.content.forEach((contenu,i) => {
                arrayDataToSend.push(
                    <SubContent key={i} data={contenu} onSearch={false} />
                )
            })
        }
        if ('' !== this.props.searchKeyword){
            return (
                <div>
                    <h3> Recherche de:  <span className="searchKeyWord">"{this.props.searchKeyword}"</span> </h3>
                    <p>{arrayDataToSend.length + ' Résultats'} </p>
                    {arrayDataToSend}
                </div>
            );
        }
        else{
            return (
                <div>
                    {arrayDataToSend}
                </div>
            );
        }
    }
};

/* Composant de gestion des sous topics *************************************************************** */
class SubContent extends React.Component {

    componentDidMount() {
        for (let i = 0; i < document.getElementsByClassName('subTopicRow').length; i++) {
            for (let a = 0; a < document.getElementsByClassName('subTopicRow')[i].getElementsByClassName('question').length; a++) {
                document.getElementsByClassName('subTopicRow')[i].getElementsByClassName('question')[a].nextSibling.setAttribute('height', document.getElementsByClassName('subTopicRow')[i].getElementsByClassName('question')[a].nextSibling.offsetHeight)
            }
        }
    }

    render() {
        const contentFinal = this.props.data;
        let subTopicName = '';
        const onSearch = this.props.onSearch;
        subTopicName = contentFinal.nameSubTopic
        if(onSearch){
            return (
                <div className='subTopicRow onSearch'>
                    <h3 className="subTopic">{subTopicName}</h3>
                    <QuestionAnswer nameTopic={this.props.nameTopic} data={contentFinal} onSearch={onSearch}/>
                </div>

            );
        }else{
            return (
                <div className='subTopicRow'>
                    <h3 className="subTopic">{subTopicName}</h3>
                    <QuestionAnswer nameTopic={this.props.nameTopic} data={contentFinal} onSearch={onSearch}/>
                </div>

            );
        }
    }
}



/* Composant de gestion de l'affichages des question réponse en fonction des sous topics ou d'une recherche ******************* */
class QuestionAnswer extends React.Component {
    render() {
        const arrayQuestionAnswer = [];
        const contentQandA = this.props.data;
        const nameTopic = this.props.nameTopic;
        const onSearch = this.props.onSearch
        if (onSearch) {
            arrayQuestionAnswer.push(
                    <RenderingQuestions onSearch={true} key={nameTopic} question={contentQandA.question} response={contentQandA.response} nameTopic={nameTopic}/>
            )
        } else {
            contentQandA.content.forEach((contenu,i) => {
                arrayQuestionAnswer.push(
                    <RenderingQuestions key={i} question={contenu.question} response={contenu.response}/>
                )
            })
        }
        return (
            <div className="row">
                {arrayQuestionAnswer}
            </div>

        );
    }
}

class RenderingQuestions extends React.Component {
    constructor(props) {
        super(props);
        this.handleAnimationOnclick = this.handleAnimationOnclick.bind(this)
        this.handleAnimation = this.handleAnimation.bind(this)
    }
    handleAnimation(e, a) {
        let element = '';
        if (a) {
            element = e.nextSibling;

        } else {
            element = e.target.nextSibling;
        }
        if ('' === element.style.height || '0px' === element.style.height) {
            element.style.height = 'auto'
            element.setAttribute('height', element.offsetHeight)
        }
        if (element.offsetHeight > 0) {
            element.previousSibling.classList.remove('questionIsClosed')
            cancelAnimationFrame(animateClose)
            cancelAnimationFrame(animateOpen)
            let i = element.offsetHeight;
            var animateOpen = function () {
                if (i >= 0) {
                    i = i - 15;
                    if (i < 0) {
                        i = 0;
                    }
                    element.style.maxHeight = i + 'px'
                    requestAnimationFrame(animateOpen)

                }
            }
            requestAnimationFrame(animateOpen);

        } else if (element.offsetHeight <= 0) {
            element.previousSibling.classList.add('questionIsClosed')
            element.style.height = 'auto';
            let i = 0;
            cancelAnimationFrame(animateClose)
            cancelAnimationFrame(animateOpen)
            var animateClose = function () {
                if (i !== element.attributes[2].value) {
                    i = i + 15;
                    element.style.maxHeight = i + 'px'
                    if (i > element.attributes[2].value || i === element.attributes[2].value) {
                        element.style.maxHeight = ''
                    }
                    requestAnimationFrame(animateClose)
                }
            }
            requestAnimationFrame(animateClose);

        }
    }
    handleAnimationOnclick(e) {
        this.handleAnimation(e)
    }
    componentDidMount(){
       if (!this.props.onSearch) {
                for (let a = 0; a < document.getElementsByClassName('question').length; a++){
                    if (document.getElementsByClassName('question')[a].nextSibling.offsetHeight > 0){
                        this.handleAnimation(document.getElementsByClassName('question')[a],true)
                    }
            }
        }
    }
    componentDidUpdate() {
        if (!this.props.onSearch) {
            for (let a = 0; a < document.getElementsByClassName('question').length; a++) {
                if (document.getElementsByClassName('question')[a].nextSibling.offsetHeight > 0) {
                    this.handleAnimation(document.getElementsByClassName('question')[a], true)
                }
            }
        }
    }
    render(){
        if(this.props.onSearch){
            return(
                <div className="questionSection">
                    <h5 className="question questionIsClosed"
                        onClick={e => { this.handleAnimationOnclick(e) }}>
                        {this.props.question} <span>{this.props.nameTopic}</span>
                    </h5>
                    <p className="response">
                        {this.props.response}
                    </p>
                </div>
            )
        }else{
            return(
                <div className="questionSection">
                    <h5 className="question questionIsClosed"
                        onClick={e => { this.handleAnimationOnclick(e) }}>
                        {this.props.question}
                    </h5>
                    <p className="response">
                        {this.props.response}
                    </p>
                </div>
            )
        }
    }
}
/**Data test ******************************************************************************** */
const dataTest =
    {
        fr:[
            {
                nameTopic: 'FAQ',
                icon: icon1,
                content: [
                    {
                        nameSubTopic: "Gérer mes formations",
                        content: [
                            {
                                nameQuestion: 'Question1_gerermesformation',
                                question: 'Integer mi magna, semper vitae fermentum et, consequat ?',
                                response: 'Mpulvinar tellus. Sed ut odio dictum, venenatis odio sed, fermentum dui. Aenean convallis augue et nunc vestibulum, sed pharetra dui varius. Proin euismod, leo sit amet iaculis tempus, tortor libero mattis eros, id sagittis risus orci eu elit. Suspendisse non gravida mi, in volutpat magna. Integer neque augue, porta in fermentum in, luctus a velit. Integer sit amet massa id magna suscipit ultrices. Mpulvinar tellus. Sed ut odio dictum, venenatis odio sed, fermentum dui. Aenean convallis augue et nunc vestibulum, sed pharetra dui varius. Proin euismod, leo sit amet iaculis tempus, tortor libero mattis eros, id sagittis risus orci eu elit. Suspendisse non gravida mi, in volutpat magna. Integer neque augue, porta in fermentum in, luctus a velit. Integer sit amet massa id magna suscipit ultrices. Mpulvinar tellus. Sed ut odio dictum, venenatis odio sed, fermentum dui. Aenean convallis augue et nunc vestibulum, sed pharetra dui varius. Proin euismod, leo sit amet iaculis tempus, tortor libero mattis eros, id sagittis risus orci eu elit. Suspendisse non gravida mi, in volutpat magna. Integer neque augue, porta in fermentum in, luctus a velit. Integer sit amet massa id magna suscipit ultrices. Mpulvinar tellus. Sed ut odio dictum, venenatis odio sed, fermentum dui. Aenean convallis augue et nunc vestibulum, sed pharetra dui varius. Proin euismod, leo sit amet iaculis tempus, tortor libero mattis eros, id sagittis risus orci eu elit. Suspendisse non gravida mi, in volutpat magna. Integer neque augue, porta in fermentum in, luctus a velit. Integer sit amet massa id magna suscipit ultrices. Mpulvinar tellus. Sed ut odio dictum, venenatis odio sed, fermentum dui. Aenean convallis augue et nunc vestibulum, sed pharetra dui varius. Proin euismod, leo sit amet iaculis tempus, tortor libero mattis eros, id sagittis risus orci eu elit. Suspendisse non gravida mi, in volutpat magna. Integer neque augue, porta in fermentum in, luctus a velit. Integer sit amet massa id magna suscipit ultrices. Mpulvinar tellus. Sed ut odio dictum, venenatis odio sed, fermentum dui. Aenean convallis augue et nunc vestibulum, sed pharetra dui varius. Proin euismod, leo sit amet iaculis tempus, tortor libero mattis eros, id sagittis risus orci eu elit. Suspendisse non gravida mi, in volutpat magna. Integer neque augue, porta in fermentum in, luctus a velit. Integer sit amet massa id magna suscipit ultrices. Mpulvinar tellus. Sed ut odio dictum, venenatis odio sed, fermentum dui. Aenean convallis augue et nunc vestibulum, sed pharetra dui varius. Proin euismod, leo sit amet iaculis tempus, tortor libero mattis eros, id sagittis risus orci eu elit. Suspendisse non gravida mi, in volutpat magna. Integer neque augue, porta in fermentum in, luctus a velit. Integer sit amet massa id magna suscipit ultrices. Mpulvinar tellus. Sed ut odio dictum, venenatis odio sed, fermentum dui. Aenean convallis augue et nunc vestibulum, sed pharetra dui varius. Proin euismod, leo sit amet iaculis tempus, tortor libero mattis eros, id sagittis risus orci eu elit. Suspendisse non gravida mi, in volutpat magna. Integer neque augue, porta in fermentum in, luctus a velit. Integer sit amet massa id magna suscipit ultrices. Mpulvinar tellus. Sed ut odio dictum, venenatis odio sed, fermentum dui. Aenean convallis augue et nunc vestibulum, sed pharetra dui varius. Proin euismod, leo sit amet iaculis tempus, tortor libero mattis eros, id sagittis risus orci eu elit. Suspendisse non gravida mi, in volutpat magna. Integer neque augue, porta in fermentum in, luctus a velit. Integer sit amet massa id magna suscipit ultrices. Mpulvinar tellus. Sed ut odio dictum, venenatis odio sed, fermentum dui. Aenean convallis augue et nunc vestibulum, sed pharetra dui varius. Proin euismod, leo sit amet iaculis tempus, tortor libero mattis eros, id sagittis risus orci eu elit. Suspendisse non gravida mi, in volutpat magna. Integer neque augue, porta in fermentum in, luctus a velit. Integer sit amet massa id magna suscipit ultrices. '
                            },
                            {
                                nameQuestion: 'Question2_gerermesformation',
                                question: 'Integer mi magna, semper vitae fermentum et, consequat ?',
                                response: 'Mpulvinar tellus. Sed ut odio dictum, venenatis odio sed, fermentum dui. Aenean convallis augue et nunc vestibulum, sed pharetra dui varius. Proin euismod, leo sit amet iaculis tempus, tortor libero mattis eros, id sagittis risus orci eu elit. Suspendisse non gravida mi, in volutpat magna. Integer neque augue, porta in fermentum in, luctus a velit. Integer sit amet massa id magna suscipit ultrices. '
                            },
                            {
                                nameQuestion: 'Question3_gerermesformation',
                                question: 'Integer mi magna, semper vitae fermentum et, consequat ?',
                                response: 'Mpulvinar tellus. Sed ut odio dictum, venenatis odio sed, fermentum dui. Aenean convallis augue et nunc vestibulum, sed pharetra dui varius. Proin euismod, leo sit amet iaculis tempus, tortor libero mattis eros, id sagittis risus orci eu elit. Suspendisse non gravida mi, in volutpat magna. Integer neque augue, porta in fermentum in, luctus a velit. Integer sit amet massa id magna suscipit ultrices. '
                            },
                            {
                                nameQuestion: 'Question4_gerermesformation',
                                question: 'Integer mi magna, semper vitae fermentum et, consequat ?',
                                response: 'Mpulvinar tellus. Sed ut odio dictum, venenatis odio sed, fermentum dui. Aenean convallis augue et nunc vestibulum, sed pharetra dui varius. Proin euismod, leo sit amet iaculis tempus, tortor libero mattis eros, id sagittis risus orci eu elit. Suspendisse non gravida mi, in volutpat magna. Integer neque augue, porta in fermentum in, luctus a velit. Integer sit amet massa id magna suscipit ultrices. '
                            }
                        ]
                    },
                    {
                        nameSubTopic: "Gérer mes formations 2",
                        content: [
                            {
                                nameQuestion: 'Question1_gerermesformation_1',
                                question: 'Quelle est ma question ?',
                                response: 'Ma réponse Gérer mes formations 2 question 1 '
                            },
                            {
                                nameQuestion: 'Question2_gerermesformation_2',
                                question: 'Vivamus consequat, tortor nec lobortis sollicitudin ?',
                                response: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris nisl ligula, varius non arcu volutpat, placerat interdum mi. Aliquam nec arcu molestie, condimentum urna interdum, pretium dolor.'
                            },
                            {
                                nameQuestion: 'Question3_gerermesformation_2',
                                question: 'Vivamus consequat, tortor nec lobortis sollicitudin ?',
                                response: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris nisl ligula, varius non arcu volutpat, placerat interdum mi. Aliquam nec arcu molestie, condimentum urna interdum, pretium dolor.'
                            }
                        ]
                    }
                ]
            },
            {
                nameTopic: 'Astuces',
                icon: icon2,
                content: [
                    {
                        nameSubTopic: "Gérer mes Astuces",
                        content: [
                            {
                                nameQuestion: 'Question1_gerermesAstuces_1',
                                question: 'Integer mi magna, semper vitae fermentum et, consequat ?',
                                response: 'Mpulvinar tellus. Sed ut odio dictum, venenatis odio sed, fermentum dui. Aenean convallis augue et nunc vestibulum, sed pharetra dui varius. Proin euismod, leo sit amet iaculis tempus, tortor libero mattis eros, id sagittis risus orci eu elit. Suspendisse non gravida mi, in volutpat magna. Integer neque augue, porta in fermentum in, luctus a velit. Integer sit amet massa id magna suscipit ultrices. '
                            },
                            {
                                nameQuestion: 'Question2_gerermesAstuces_1',
                                question: 'Integer mi magna, semper vitae fermentum et, consequat ?',
                                response: 'Mpulvinar tellus. Sed ut odio dictum, venenatis odio sed, fermentum dui. Aenean convallis augue et nunc vestibulum, sed pharetra dui varius. Proin euismod, leo sit amet iaculis tempus, tortor libero mattis eros, id sagittis risus orci eu elit. Suspendisse non gravida mi, in volutpat magna. Integer neque augue, porta in fermentum in, luctus a velit. Integer sit amet massa id magna suscipit ultrices. '
                            },
                            {
                                nameQuestion: 'Question3_gerermesAstuces_1',
                                question: 'Integer mi magna, semper vitae fermentum et, consequat ?',
                                response: 'Mpulvinar tellus. Sed ut odio dictum, venenatis odio sed, fermentum dui. Aenean convallis augue et nunc vestibulum, sed pharetra dui varius. Proin euismod, leo sit amet iaculis tempus, tortor libero mattis eros, id sagittis risus orci eu elit. Suspendisse non gravida mi, in volutpat magna. Integer neque augue, porta in fermentum in, luctus a velit. Integer sit amet massa id magna suscipit ultrices. '
                            },
                            {
                                nameQuestion: 'Question4_gerermesAstuces_1',
                                question: 'Integer mi magna, semper vitae fermentum et, consequat ?',
                                response: 'Mpulvinar tellus. Sed ut odio dictum, venenatis odio sed, fermentum dui. Aenean convallis augue et nunc vestibulum, sed pharetra dui varius. Proin euismod, leo sit amet iaculis tempus, tortor libero mattis eros, id sagittis risus orci eu elit. Suspendisse non gravida mi, in volutpat magna. Integer neque augue, porta in fermentum in, luctus a velit. Integer sit amet massa id magna suscipit ultrices. '
                            }
                        ]
                    },
                    {
                        nameSubTopic: "Gérer mes Astuces 2",
                        content: [
                            {
                                nameQuestion: 'dfghdf',
                                question: 'Integer mi magna, semper vitae fermentum et, consequat ?',
                                response: 'Mpulvinar tellus. Sed ut odio dictum, venenatis odio sed, fermentum dui. Aenean convallis augue et nunc vestibulum, sed pharetra dui varius. Proin euismod, leo sit amet iaculis tempus, tortor libero mattis eros, id sagittis risus orci eu elit. Suspendisse non gravida mi, in volutpat magna. Integer neque augue, porta in fermentum in, luctus a velit. Integer sit amet massa id magna suscipit ultrices. '
                            },
                            {
                                nameQuestion: 'Quesbtbttion2',
                                question: 'Integer mi magna, semper vitae fermentum et, consequat ?',
                                response: 'Mpulvinar tellus. Sed ut odio dictum, venenatis odio sed, fermentum dui. Aenean convallis augue et nunc vestibulum, sed pharetra dui varius. Proin euismod, leo sit amet iaculis tempus, tortor libero mattis eros, id sagittis risus orci eu elit. Suspendisse non gravida mi, in volutpat magna. Integer neque augue, porta in fermentum in, luctus a velit. Integer sit amet massa id magna suscipit ultrices. '
                            },
                            {
                                nameQuestion: 'Questertvbdsion1',
                                question: 'Integer mi magna, semper vitae fermentum et, consequat ?',
                                response: 'Mpulvinar tellus. Sed ut odio dictum, venenatis odio sed, fermentum dui. Aenean convallis augue et nunc vestibulum, sed pharetra dui varius. Proin euismod, leo sit amet iaculis tempus, tortor libero mattis eros, id sagittis risus orci eu elit. Suspendisse non gravida mi, in volutpat magna. Integer neque augue, porta in fermentum in, luctus a velit. Integer sit amet massa id magna suscipit ultrices. '
                            },
                            {
                                nameQuestion: 'Quesdfgvttion2',
                                question: 'Integer mi magna, semper vitae fermentum et, consequat ?',
                                response: 'Mpulvinar tellus. Sed ut odio dictum, venenatis odio sed, fermentum dui. Aenean convallis augue et nunc vestibulum, sed pharetra dui varius. Proin euismod, leo sit amet iaculis tempus, tortor libero mattis eros, id sagittis risus orci eu elit. Suspendisse non gravida mi, in volutpat magna. Integer neque augue, porta in fermentum in, luctus a velit. Integer sit amet massa id magna suscipit ultrices. '
                            }
                        ]
                    }
                ]
            },
            {
                nameTopic: 'Réglementation',
                icon: icon3,
                content: [
                    {
                        nameSubTopic: "Gérer mes reglementation",
                        content: [
                            {
                                nameQuestion: 'Queerthfghstion1',
                                question: 'Integer mi magna, semper vitae fermentum et, consequat ?',
                                response: 'Mpulvinar tellus. Sed ut odio dictum, venenatis odio sed, fermentum dui. Aenean convallis augue et nunc vestibulum, sed pharetra dui varius. Proin euismod, leo sit amet iaculis tempus, tortor libero mattis eros, id sagittis risus orci eu elit. Suspendisse non gravida mi, in volutpat magna. Integer neque augue, porta in fermentum in, luctus a velit. Integer sit amet massa id magna suscipit ultrices. '
                            },
                            {
                                nameQuestion: 'Quebgfbfgstion2',
                                question: 'Integer mi magna, semper vitae fermentum et, consequat ?',
                                response: 'Mpulvinar tellus. Sed ut odio dictum, venenatis odio sed, fermentum dui. Aenean convallis augue et nunc vestibulum, sed pharetra dui varius. Proin euismod, leo sit amet iaculis tempus, tortor libero mattis eros, id sagittis risus orci eu elit. Suspendisse non gravida mi, in volutpat magna. Integer neque augue, porta in fermentum in, luctus a velit. Integer sit amet massa id magna suscipit ultrices. '
                            },
                            {
                                nameQuestion: 'Questsertsion1',
                                question: 'Integer mi magna, semper vitae fermentum et, consequat ?',
                                response: 'Mpulvinar tellus. Sed ut odio dictum, venenatis odio sed, fermentum dui. Aenean convallis augue et nunc vestibulum, sed pharetra dui varius. Proin euismod, leo sit amet iaculis tempus, tortor libero mattis eros, id sagittis risus orci eu elit. Suspendisse non gravida mi, in volutpat magna. Integer neque augue, porta in fermentum in, luctus a velit. Integer sit amet massa id magna suscipit ultrices. '
                            },
                            {
                                nameQuestion: 'Quesdfgvrtion2',
                                question: 'Integer mi magna, semper vitae fermentum et, consequat ?',
                                response: 'Mpulvinar tellus. Sed ut odio dictum, venenatis odio sed, fermentum dui. Aenean convallis augue et nunc vestibulum, sed pharetra dui varius. Proin euismod, leo sit amet iaculis tempus, tortor libero mattis eros, id sagittis risus orci eu elit. Suspendisse non gravida mi, in volutpat magna. Integer neque augue, porta in fermentum in, luctus a velit. Integer sit amet massa id magna suscipit ultrices. '
                            }
                        ]
                    },
                    {
                        nameSubTopic: "Gérer mes reglementation 2",
                        content: [
                            {
                                nameQuestion: 'Questisdfgbvgon1',
                                question: 'Quelle est ma question ?',
                                response: 'Ma réponse Gérer mes reglementation 2 question 1'
                            }
                        ]
                    }
                ]
            },
            {
                nameTopic: 'Divers',
                icon: icon1,
                content: [
                    {
                        nameSubTopic: "Gérer Divers",
                        content: [
                            {
                                nameQuestion: 'Questdfgdbgion1',
                                question: 'Quelle est ma question ?',
                                response: 'Ma réponse Gérer mes reglementation question 1'
                            }
                        ]
                    },
                    {
                        nameSubTopic: "Gérer Divers 2",
                        content: [
                            {
                                nameQuestion: 'Quedfgdbgfbgfstion1',
                                question: 'Quelle est ma question ?',
                                response: 'Ma réponse Gérer mes reglementation 2 question 1'
                            }
                        ]
                    }
                ]
            },
            {
                nameTopic: 'TestTopicsupplementaire',
                icon: icon1,
                content: [
                    {
                        nameSubTopic: "Gérer mes reglementation",
                        content: [
                            {
                                nameQuestion: 'Question1',
                                question: 'Quelle est ma question ?',
                                response: 'Ma réponse Gérer mes reglementation question 1'
                            }
                        ]
                    },
                    {
                        nameSubTopic: "Gérer mes reglementation 2",
                        content: [
                            {
                                nameQuestion: 'Question1',
                                question: 'Quelle est ma question ?',
                                response: 'Ma réponse Gérer mes reglementation 2 question 1'
                            }
                        ]
                    }
                ]
            }
        ],

        en: [
            {
                nameTopic: 'FAQEN',
                icon: icon1,
                content: [
                    {
                        nameSubTopic: "Gérer mes formations",
                        content: [
                            {
                                nameQuestion: 'Question1',
                                question: 'Integer mi magna, semper vitae fermentum et, consequat ?',
                                response: 'Mpulvinar tellus. Sed ut odio dictum, venenatis odio sed, fermentum dui. Aenean convallis augue et nunc vestibulum, sed pharetra dui varius. Proin euismod, leo sit amet iaculis tempus, tortor libero mattis eros, id sagittis risus orci eu elit. Suspendisse non gravida mi, in volutpat magna. Integer neque augue, porta in fermentum in, luctus a velit. Integer sit amet massa id magna suscipit ultrices. '
                            }
                        ]
                    },
                    {
                        nameSubTopic: "Gérer mes formations 2",
                        content: [
                            {
                                nameQuestion: 'Question1',
                                question: 'Quelle est ma question ?',
                                response: 'Ma réponse Gérer mes formations 2 question 1 '
                            },
                            {
                                nameQuestion: 'Question2',
                                question: 'Vivamus consequat, tortor nec lobortis sollicitudin ?',
                                response: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris nisl ligula, varius non arcu volutpat, placerat interdum mi. Aliquam nec arcu molestie, condimentum urna interdum, pretium dolor.'
                            }
                        ]
                    }
                ]
            },
            {
                nameTopic: 'AstucesEN',
                icon: icon1,
                content: [
                    {
                        nameSubTopic: "Gérer mes Astuces",
                        content: [
                            {
                                nameQuestion: 'Question1',
                                question: 'Quelle est ma question ?',
                                response: 'Ma réponse "Gérer mes Astuces question 1'
                            }
                        ]
                    },
                    {
                        nameSubTopic: "Gérer mes Astuces 2",
                        content: [
                            {
                                nameQuestion: 'Question1',
                                question: 'Quelle est ma question ?',
                                response: 'Ma réponse "Gérer mes Astuces 2 question 1'
                            }
                        ]
                    }
                ]
            },
            {
                nameTopic: 'RéglementationEN',
                icon: icon1,
                content: [
                    {
                        nameSubTopic: "Gérer mes reglementation",
                        content: [
                            {
                                nameQuestion: 'Question1',
                                question: 'Quelle est ma question ?',
                                response: 'Ma réponse Gérer mes reglementation question 1'
                            }
                        ]
                    },
                    {
                        nameSubTopic: "Gérer mes reglementation 2",
                        content: [
                            {
                                nameQuestion: 'Question1',
                                question: 'Quelle est ma question ?',
                                response: 'Ma réponse Gérer mes reglementation 2 question 1'
                            }
                        ]
                    }
                ]
            },
            {
                nameTopic: 'DiversEN',
                icon: icon1,
                content: [
                    {
                        nameSubTopic: "Gérer mes reglementation",
                        content: [
                            {
                                nameQuestion: 'Question1',
                                question: 'Quelle est ma question ?',
                                response: 'Ma réponse Gérer mes reglementation question 1'
                            }
                        ]
                    },
                    {
                        nameSubTopic: "Gérer mes reglementation 2",
                        content: [
                            {
                                nameQuestion: 'Question1',
                                question: 'Quelle est ma question ?',
                                response: 'Ma réponse Gérer mes reglementation 2 question 1'
                            }
                        ]
                    }
                ]
            },
            {
                nameTopic: 'TestNEW',
                icon: icon1,
                content: [
                    {
                        nameSubTopic: "Gérer mes reglementation",
                        content: [
                            {
                                nameQuestion: 'Question1',
                                question: 'Quelle est ma question ?',
                                response: 'Ma réponse Gérer mes reglementation question 1'
                            }
                        ]
                    },
                    {
                        nameSubTopic: "Gérer mes reglementation 2",
                        content: [
                            {
                                nameQuestion: 'Question1',
                                question: 'Quelle est ma question ?',
                                response: 'Ma réponse Gérer mes reglementation 2 question 1'
                            }
                        ]
                    }
                ]
            }
        ]
    }
/* Début du rendu *********************************************** */

ReactDOM.render(
    <App data={dataTest}/>,
    document.getElementById('root')
);
