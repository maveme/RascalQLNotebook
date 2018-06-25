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
import NotebookQL;
import QL;
import Load;
import bacata::salix::Bridge;
import bacata::util::Proposer;
import exercises::Part2;
import AST;
import vis::Figure;
import salix::App;
import salix::HTML;
import salix::Core;
import salix::Node;
import bacata::util::Util;
import salix::lib::Dagre;

public REPL qlREPL(){
	return repl( handl, complet, visualization = makeSalixMultiplexer(|http://localhost:3434|, |tmp:///|) );
} 

map[str, AST::Form] history = ();

Form astt = form("",[]);

CommandResult handl(str line){
	errors=[];
	result = "";
	try {
		pt = parse(#start[CommandForm], line);
		switch(pt.top){
			case (CommandForm)`form <Id idss> = <Form form>`: {
				imploForm = implodeForm(form);
			    msgs = check(imploForm) + cyclicErrors(controlDeps(imploForm));
			    if (msgs == {}) {
			    	history += ("<idss>" : imploForm);
			        return textual("ok", messages = errors);
			     }
			     else{
			     	errors = translateErrorMessages(msgs);
					return textual(result, messages = errors);
			     }
			}
			case (CommandForm)`visualize(<Id idd>)`: {
				astt = history["<idd>"];
				return salix(makeApp(init, view, update));
			}
			case (CommandForm)`html(<Id idd>)`: {
				try{
					thisForm = history["<idd>"];
					rst = "\<script\><compile(desugar(thisForm))>\</script\>";
			        rst += toHTML(viewQlForm);
			       return textual("<rst>", messages = errors);
				}
				catch: {
					errors = translateErrorMessages(msgs);
					return textual(result, messages = errors);
				}
			}
		}
	}
	catch ParseError(lo):
	{
		errors = [error("Parse error at <lo>")];
		return textual(result, messages = errors);
	}
}

Completion complet(str prefix, int offset) {
	proposerFunction = proposer(#CommandForm);
   	return < 0, ["<prop.newText>" | prop <- proposerFunction(prefix, offset)] >;
}

void viewQlForm(){
	div(id("QL-content"));
}

Model init() = astt;

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