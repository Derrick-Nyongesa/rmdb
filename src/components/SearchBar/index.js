import React, {Component} from 'react';
//Image
import searchIcon from '../../images/search-icon.svg';
//styles
import { Wrapper, Content } from './SearchBar.styles';

class SearchBar extends Component {
    // const [state, setState] = useState('');
    // const initial = useRef(true);
    state = {value: ''};
    timeout = null;

    componentDidUpdate(_prevProps, prevState){
        if (this.state.value != prevState.value){
            const {setSearchTerm} = this.props;

            clearTimeout(this.timeout)

            this.timeout = setTimeout(() =>{
                const {value} = this.state;
                setSearchTerm(value);
            }, 500);
        }
    }

    render(){
        return(
            <Wrapper>
                <Content>
                    <img src={searchIcon} alt='search-icon'></img>
                    <input 
                    type='text' 
                    placeholder='Search Movie'
                    onChange={event => this.setState({value:event.currentTarget.value})}
                    value={this.state.value}>
                    </input>
                </Content>
            </Wrapper>
        );

    }
    
    
};

export default SearchBar;