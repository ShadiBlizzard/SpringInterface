import React from 'react';

class CareersMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            size: 20,
            result: [],
            prev: true,
            next: false,
            max: 0
        }

        this.goNext = this.goNext.bind(this);
        this.goPrevious = this.goPrevious.bind(this);
        this.findCareers = this.findCareers.bind(this);
        this.onIndexUpdate = this.onIndexUpdate.bind(this);
    }


    componentWillMount() {
        fetch('http://localhost:8080/career/count')
        .then((response) => response.json())
        .then(searchRes => {
            this.setState({
                max: searchRes.response
            });
        })
        .catch(err => console.log(err));
        this.findCareers();
        }

    findCareers() {
        fetch('http://localhost:8080/career/all?page=' + this.state.page + "&size=" + this.state.size)
            .then((response) => response.json())
            .then(searchRes => {
                console.log(searchRes);
                this.setState({
                    result: searchRes.response
                });
            })
            .catch((err) => console.log(err));

    }

    render() {
        const careers = this.state.result;
        return (
            <div id="baseTable">
                <table border='1'>
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
                    <button disabled={this.state.prev} onClick={this.goPrevious} id="previous">Previous</button>
                    <button disabled={this.state.next} onClick={this.goNext} id="next">Next</button>
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