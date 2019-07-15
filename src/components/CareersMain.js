import React from 'react';
import Loading from '../images/loading.gif';

class CareersMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            size: 20,
            result: [],
            prev: true,
            next: false,
            max: 0,
            loading: false,
        }

        this.goNext = this.goNext.bind(this);
        this.goPrevious = this.goPrevious.bind(this);
        this.findCareers = this.findCareers.bind(this);
        this.onIndexUpdate = this.onIndexUpdate.bind(this);
    }


    componentWillMount() {
        this.setState( {
            loading: true
        });
        fetch('http://localhost:8080/career/count')
        .then((response) => response.json())
        .then(searchRes => {
            this.setState({
                max: searchRes.response,
                loading: false
            });
        })
        .catch(err => console.log(err));
        this.findCareers();
        }

    findCareers() {
        this.setState( {
            loading: true
        });
        fetch('http://localhost:8080/career/all?page=' + this.state.page + "&size=" + this.state.size)
            .then((response) => response.json())
            .then(searchRes => {
                console.log(searchRes);
                this.setState({
                    result: searchRes.response,
                    loading: false
                });
            })
            .catch((err) => console.log(err));

    }

    render() {
        const careers = this.state.result;
        if(this.state.loading) 
        return(
            <img class="loading" src={Loading} alt="loading"/>
        );

        return (
            <div id="basetable">
                <table border='1' cellSpacing="1%" cellPadding="2%">
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Surname</th>
                            <th>Course</th>
                            <th>Evaluation</th>
                        </tr>
                        {careers.map(function (item, index) {
                            return (
                                <tr key={index}>
                                    <td>{item.careerId.studentname}</td>
                                    <td>{item.careerId.studentsurname}</td>
                                    <td>{item.careerId.coursename}</td>
                                    <td>{item.careerId.evaluation}</td>
                                </tr>
                            );
                        }
                        )}
                    </tbody>
                </table>
                <div align='right'>
                    <button disabled={this.state.prev} onClick={this.goPrevious} id="previous" className="customButton navbuttons">Previous</button>
                    <button disabled={this.state.next} onClick={this.goNext} id="next" className="customButton navbuttons">Next</button>
                </div>

            </div>
        );

    }

    goPrevious() {
        const paging = this.onIndexUpdate('prev');
        
        this.setState({
            page: this.state.page - 1,
            prev: paging,
            next: false,
        }, this.findCareers);
    }

    onIndexUpdate(arrow) {
        var pagingP = true;
        var pagingN = false;

        switch(arrow) {
            case 'prev':
                if(this.state.page-1>0)
                    pagingP = false;
                return pagingP;
            case 'next':
                if(this.state.page+1 === this.state.max)
                    pagingN = true;
                return pagingN;
            default: break;

        }
    }

    goNext() {
        const paging = this.onIndexUpdate('next');

        this.setState({
            page: this.state.page +1,
            next: paging,
            prev: false
        }, this.findCareers);

    }

}

export default CareersMain;