module QLREPL

import IO;
import Dependencies;
import Resolve;
import Check;
import Outline;
import Compile;
import Normalize;
import Format;
import ParseTree;
import QL;
import Load;
import bacata::salix::Bridge;
import bacata::util::Proposer;
import exercises::Part2;
import AST;
import vis::Figure;
//import vis::Render;
import salix::App;
import salix::HTML;
import salix::Core;
import salix::Node;
import bacata::visualization::Visualization;

import salix::lib::Dagre;

public REPL qlREPL(){
	return repl( handl, complet);
} 

public REPL tmpREPL(){ 
       return repl(
	         	hand,
	         	complet
	         	visualization = makeSalixMultiplexer(|http://localhost:3434|, |tmp:///|)
         );
   }
Form astt = form("",[]);

CommandResult hand(str line){
	errors=[];
	try{ 
		pt = parse(#start[Form], line);
		astt = implodeQL(pt);
		return salix(makeApp(init, view, update));
	}
	catch ParseError(lo):
	{
		errors = [error("Parse error at <lo>")];
		return textual(result, messages = errors);
	}
	
}

CommandResult handl(str line){
	errors=[];
	result = "";
	try 
		pt = parse(#start[Form], line);
	catch ParseError(lo):
	{
		errors = [error("Parse error at <lo>")];
		return textual(result, messages = errors);
	}
	ast = implodeQL(pt);
    msgs = check(ast) + cyclicErrors(controlDeps(ast));
    if (msgs == {}) {
        rst = "\<script\><compile(desugar(ast))>\</script\>";
        rst += toHTML(viewQlForm);
        //rst += "\<div id=\"QL-content\"\>\</div\>";
       return textual("<rst>", messages = errors);
     }
     else{
     	errors = [error("Error: <msgs>")];
		return textual(result, messages = errors);
     }
}

Completion complet(str prefix, int offset) {
	proposerFunction = proposer(#Form);
   	return < 0, ["<prop.newText>" | prop <- proposerFunction(prefix, offset)] >;
}

void pp(){
	div(id("header"),class("claze"), () {
	    h2(class("tmpo"),"Celsius to fahrenheit converter");
	    p("jp;a");
	    h2(class("tmpo"),"Celsius to fahrenheit converter");
	    text("holsfsd");
  	});
}

void viewQlForm(){
	div(id("QL-content"));
}

//------------------

salix::Node::Node inp2() = render(view);

Model init() =astt;

data Msg = ope();

alias Model = Form;

Model update(Msg msg, Model m) {
  return m;
}
 
 Form tmp(){
 	pt = parse(#start[Form], readFile(|project://RascalQLTutorial/examples/tax.tql|));
 	return implodeQL(pt);
 }

set[Node] getNodesH(rel[Node from, Node to] fa){
	return {from|<Node from, Node to> <-fa}+ {to|<Node from, Node to> <-fa};
}

void view(Model ast) {
  div(() {
    h4("Visualization");    
    dagre("mygraph", rankdir("LR"), title("M3 modules"), width(960), height(600), (N n, E e) {
    nos = resolve(controlDeps(ast) + dataDeps(ast)); 
    for(Node x <- getNodesH(nos)){
        n("<x.label>", shape("rect"), () {
            div(id("nod-label"),(){
                p("<x.label>");
            });
        });
        }
        for (<Node from, Node to> <- nos) {
             e("<from.label>", "<to.label>", lineInterpolate("cardinal"));
         }
    }); 
  });
}