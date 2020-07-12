import React, {Component} from 'react';

interface IProps {

}

interface IState {
    menu: "menu1" | "menu2"
}

class Home extends Component <IProps, IState>{

    constructor(props: IProps) {
        super(props);

        this.state = {
            menu: "menu1"
        }
    }

    onChangeOneMenu = () => {
        this.setState({
            menu: "menu1",
        })
    }

    onChangeEveryMenu = () => {
        this.setState({
            menu: "menu2",
        })
    }

    render(){

        const { menu } = this.state;

        return(
            <div>
                    Main Home
            </div>
        );
    }
}

export default Home;