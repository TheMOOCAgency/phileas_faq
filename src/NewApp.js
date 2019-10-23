/*import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable'*/
import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function IconTopic(props){
  return (
        <img alt="Icon Topic" className="iconTopic" src={props.icon} />
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}
class MenuApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleInputSearch = this.handleInputSearch.bind(this)

    }
    handleInputSearch(e){
        this.props.handleSearchBar(e.target.value)
    }
    getQuestionId = () => {
      let urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has("questionId")) {
        var topicOnSearch = 0;
       this.props.data.map((data,index) => {if(data.content.find(subData => subData.content.some(subQuestion =>  subQuestion.questionId === urlParams.get("questionId")))) {topicOnSearch = index}});
        if(topicOnSearch => 0){
            this.props.changeTab(null,topicOnSearch)
        }
      }
    };
    componentDidMount() {
        this.getQuestionId()
    }

    render() {
        return (
            <div className="search">
                <div className="searchBar">
                    <form>
                        <input type="text" placeholder="Rechercher" value={this.props.searchKeyword} onChange={e => {
                            this.handleInputSearch(e);
                            }} />
                    </form>
                </div>
                {this.props.onSearch ? null :
                (<Tabs className='menuTab' variant="fullWidth" value={this.props.topicIndex} indicatorColor="primary" onChange={this.props.changeTab}>
                  {this.props.data.map((data,index)=>{
                  return (
                    <Tab key={index} icon={<IconTopic icon={data.icon} />} label={data.nameTopic} />)
                  },this)}
                  </Tabs>)
                  }
            </div>
        );
    }
}
class ContentFaq extends React.Component {

    render(){
      return (
      <div>
        {this.props.data.map((data,index)=>{
        return (
            <TabPanel key={index} value={this.props.topicIndex} index={index} >
              <SubContent  topicData={data.content}/>
            </TabPanel>
          )
        },this)}
      </div>)
    }

}

class SubContent extends React.Component {
  render() {
    return(
      <div>{
      this.props.topicData.map((data,index)=>{
      return (
        <div key={index} className='subTopicRow'>
            <h3 className="subTopic">{data.nameSubTopic}</h3>
            <QuestionAnswer questionData={data.content} />
        </div>
        )
      },this)}
      </div>
    )
    }
}

class QuestionAnswer extends React.Component {
  createMarkup(element) {
    return {__html: element};
  }
  componentDidMount(){

  }
    render() {
      let urlParams = new URLSearchParams(window.location.search);
        return (
            <div className="questionSection">
              {this.props.questionData.map((data,index)=>{
                var topicOnSearch = '';
                if (urlParams.has("questionId")) {
                    topicOnSearch = urlParams.get("questionId")
                  }
              return (
                <div key={index} id={data.questionId} className='questionRow'>
                   <ExpansionPanel defaultExpanded = {topicOnSearch === data.questionId ? true : false} >
                         <ExpansionPanelSummary
                            aria-controls="panel1a-content"
                            id="panel1a-header" >
                            <h5 className="question">
                                {data.question}
                            </h5>
                         </ExpansionPanelSummary>
                          <ExpansionPanelDetails >
                            <div className="response">
                              <div dangerouslySetInnerHTML={this.createMarkup(data.response)} />
                            </div>
                          </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </div>

                )
              },this)}
            </div>

        );
    }
}

class DisplaySearch extends React.Component {
createMarkup(element) {
  return {__html: element};
}
    render() {
        return (
            <div className="rowQuestionAnswer">
                <h3> Recherche de:  <span className="searchKeyWord">"{this.props.searchKeyword}"</span> </h3>
                {this.props.data.length < 1 ?
                  (<p>Aucun Résultats</p>)
                :
                  (
                  <div>
                  <p>{this.props.nmbSearch + ' Résultats'} </p>
                  {this.props.data.map((data,index)=>{
                      return (
                        <QuestionAnswer key={index} questionData={data} />
                        )
                  })}
                </div>
                  )
                }
            </div>

        );
    }
}

class NewApp extends React.Component { //Début app ***************************************************************************
    constructor(props) {
        super(props);
        this.handleSearch = this.handleSearch.bind(this)
        this.handleTest = this.handleTest.bind(this)
        this.state = {
            language: this.props.lang,
            search: '',
            topicIndex : 0,
            onSearch : false,
            searchData: [],
            numberOfResult : 0
        }
    }
    //eventHandler ********************************************************
    handleSearch(keyword) {
        let numberOfResult = 0;
        if(keyword === ''){
          this.setState({ search: keyword, onSearch : false, searchData : [] })
        }else{
          let dataMatching = [];
          this.props.data['en'].map((data,index)=>{
            data.content.map((contentData,index)=>{
              let subTopicToSend = []
              if(contentData.content.find((entrie)=>{
                  if(entrie.question.toLowerCase().indexOf(keyword.toLowerCase()) !== -1 || entrie.response.toLowerCase().indexOf(keyword.toLowerCase()) !== -1){
                      subTopicToSend.push(entrie)
                      numberOfResult++
                      return true
                  }else {
                    return false
                  }
              }
              )){
                 dataMatching.push(subTopicToSend)
                }
            },this)
          },this)
          this.setState({ search: keyword,onSearch : true,searchData : dataMatching,numberOfResult : numberOfResult})
        }
    }
    handleTest (event,index){
        this.setState({ topicIndex: index })
    }
    render() {
        return (
            <div className="main">
                <div className="contentWrapper">
                    <MenuApp topicIndex={this.state.topicIndex} changeTab={this.handleTest} data={this.props.data['en']} handleChangeState={this.handleClick} searchKeyword={this.state.search} onSearch={this.state.onSearch} handleSearchBar={this.handleSearch} />
                    {
                      this.state.onSearch ?
                        (
                          <DisplaySearch nmbSearch={this.state.numberOfResult} searchKeyword={this.state.search}  data={this.state.searchData} />
                        ):
                        (
                          <ContentFaq topicIndex={this.state.topicIndex}  data={this.props.data['en']} searchKeyword={this.state.search} />
                        )
                    }
                </div>
            </div>
        )
    }
}





export default NewApp
