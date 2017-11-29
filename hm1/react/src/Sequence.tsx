import * as React from "react";

interface SequenceState {
    lambda: number | string;
    index1:number | string;
    index2: number | string;
    index3: number | string;
    index4: number | string;
    index5: number | string;
}

enum Limit {minusInfinity, minus6, minus3, Infinity, unset};

const containerStyle: React.CSSProperties = {
    width: 1000,
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: 80
};

const inputStyle: React.CSSProperties = {
    borderWidth: 6,  
    borderStyle: "outset",
    borderColor: "#ca0c3d",
    width: 250
};

const epsilon: number = 0.0000001;

class Sequence extends React.Component<{}, SequenceState> {
    private sequence: Array<number>;
    private lim: Limit;

    private onLambdaChange: React.ChangeEventHandler<HTMLInputElement>;
    private onIndex1Change: React.ChangeEventHandler<HTMLInputElement>;
    private onIndex2Change: React.ChangeEventHandler<HTMLInputElement>;
    private onIndex3Change: React.ChangeEventHandler<HTMLInputElement>;
    private onIndex4Change: React.ChangeEventHandler<HTMLInputElement>;
    private onIndex5Change: React.ChangeEventHandler<HTMLInputElement>;

    private maxIndex(): number {
        return Math.max(
            Number(this.state.index1),
            Number(this.state.index2),
            Number(this.state.index3),
            Number(this.state.index4),
            Number(this.state.index5)
        );
    }

    private anValue(val: number): number | string {
        return isFinite(val) ? val : this.limString();
    }

    private static isEqual(left: number, right: number): boolean {
        return Math.abs(left - right) <= epsilon;
    }

    private static isLim(value: number): boolean {
        return Sequence.isEqual(value, -6) || Sequence.isEqual(value, -3) || isNaN(value);
    }

    private roundLim(): void {
        const length: number = this.sequence.length;
        const last: number = this.sequence[length - 1];
        this.sequence[length - 1] = Sequence.isEqual(last, -6) ? -6 : (Sequence.isEqual(last, -3) ? -3 : last); 
    }

    private an(index: number | string): number | string {
        const length: number = this.sequence.length;
        if(length && typeof index === "number") {
            if(length >= index) {
                return this.anValue(this.sequence[index - 1]);
            }
            let last: number = this.sequence[length - 1];
            for(let n: number = length; (n < index) && !Sequence.isLim(last); ++n) {
                last = Sequence.F(last);
                this.sequence.push(last);
            }
            this.roundLim();
            return this.anValue(this.sequence[this.sequence.length - 1]);
        }
        return '';
    }

    private static F(x: number): number {
        return (2 * (x * x) + 18)/(x - 9);
    }

    private static indexValue(event: React.ChangeEvent<HTMLInputElement>): number | string {
        const {value} = event.currentTarget;
        const index: number = Number(value);
        return isNaN(index) ? '' : (index ? index : ' '); 
    }

    private static isBigger(left: number, right: number): boolean {
        return (left - right) >= epsilon;
    }

    private static isSmaller(left: number, right: number): boolean {
        return (left - right) <= epsilon;
    }

    private static liman(a: number): Limit {
        if((a === -6) || (a === 3)) {
            return Limit.minus6;
        }
        if(Sequence.isBigger(a, 9)) {
            return Limit.Infinity;
        }
        if(Sequence.isBigger(a, -6) && Sequence.isSmaller(a, 3)) {
            return Limit.minus3;
        }
        return Limit.minusInfinity;
    }

    private limString(): string {
        switch(this.lim) {
            case Limit.Infinity: return "infinity";
            case Limit.minus3: return "-3";
            case Limit.minus6: return "-6";
            case Limit.minusInfinity: return "-infinity";
            default: return '';
        }
    }
    
    constructor(props: {}) {
        super(props);
        this.state = {
            lambda: '',
            index1: '',
            index2: '',
            index3: '',
            index4: '',
            index5: ''
        };
        this.sequence = [];
        this.onLambdaChange = this.setLambda.bind(this);
        this.onIndex1Change = this.setIndex1.bind(this);
        this.onIndex2Change = this.setIndex2.bind(this);
        this.onIndex3Change = this.setIndex3.bind(this);
        this.onIndex4Change = this.setIndex4.bind(this);
        this.onIndex5Change = this.setIndex5.bind(this);
    }

    setLambda(event: React.ChangeEvent<HTMLInputElement>): void {
        const lambda: number = Number(event.currentTarget.value);
        if(isNaN(lambda)) {
            this.sequence = [];
            this.lim = Limit.unset;
            this.setState({lambda: event.currentTarget.value === '-' ? '-' : ''});
            return;
        }
        if(this.state.lambda !== lambda) {
            const m: number = this.maxIndex();
            this.sequence = [lambda];
            let an: number = lambda;
            for(let n: number = 1; (n < m) && !Sequence.isLim(an); ++n) {
                an = Sequence.F(an);
                this.sequence.push(an);
            }
            this.roundLim();
            this.lim = Sequence.liman(lambda);
            this.setState({lambda: lambda});
        }
    }

    setIndex1(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({index1: Sequence.indexValue(event)});
    }

    setIndex2(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({index2: Sequence.indexValue(event)});
    }

    setIndex3(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({index3: Sequence.indexValue(event)});
    }

    setIndex4(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({index4: Sequence.indexValue(event)});
    }

    setIndex5(event: React.ChangeEvent<HTMLInputElement>): void {
        this.setState({index5: Sequence.indexValue(event)});
    }

    shouldComponentUpdate(_: {}, nextState: SequenceState): boolean {
        if(this.state.lambda !== nextState.lambda) {
            return true;
        }
        if(this.state.index1 !== nextState.index1) {
            return true;
        }
        if(this.state.index2 !== nextState.index2) {
            return true;
        }
        if(this.state.index3 !== nextState.index3) {
            return true;
        }
        if(this.state.index4 !== nextState.index4) {
            return true;
        }
        if(this.state.index5 !== nextState.index5) {
            return true;
        }
        return false;
    }

    render(): JSX.Element {
        return <div style={containerStyle}>
            <div>
                Homework1, Ivo Stratev, Informatics, 2, group 3, № 45342
            </div>
            <br/>
            <br/>
            lambda = <input
                type="text" style={inputStyle}
                value={this.state.lambda}
                onChange={this.onLambdaChange}/> => lim n -> infinity an = {this.limString()}
            <br/>
            <br/>
            a <input
                type="text" style={inputStyle}
                value={this.state.index1}
                onChange={this.onIndex1Change}/> = {this.an(this.state.index1)}
            <br/>
            <br/>
            a <input
                type="text" style={inputStyle}
                value={this.state.index2}
                onChange={this.onIndex2Change}/> = {this.an(this.state.index2)}
            <br/>
            <br/>
            a <input
                type="text" style={inputStyle}
                value={this.state.index3}
                onChange={this.onIndex3Change}/> = {this.an(this.state.index3)}
            <br/>
            <br/>
            a <input
                type="text" style={inputStyle}
                value={this.state.index4}
                onChange={this.onIndex4Change}/> = {this.an(this.state.index4)}
            <br/>
            <br/>
            a <input
                type="text" style={inputStyle}
                value={this.state.index5}
                onChange={this.onIndex5Change}/> = {this.an(this.state.index5)}
        </div>;
    }
};

export default Sequence;