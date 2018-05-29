module QLREPL

import IO;
import Dependencies;
import Resolve;
import Check;
import Outline;
import Compile;
import Normalize;
import Visualize;
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
	
	//ast = load(form);
	ast = implodeQL(pt);
    //msgs = check(ast) + cyclicErrors(controlDeps(ast) + dataDeps(ast));
    msgs = check(ast) + cyclicErrors(controlDeps(ast));
    if (msgs == {}) {
    	//js = pt@\loc.top[extension="js"];
    	//js = |cwd:///tmp.js|;
        //writeFile(|cwd:///tmp.js|, compile(desugar(ast)));
        // html = pt@\loc.top[extension="html"];
        //writeFile(|tmp:///tmp.html|, form2html(ast.name, |tmp:///tmp.js|));
        
        rst = "\<script\><compile(desugar(ast))>\</script\>";
        rst += "\<div id=\"QL-content\"\>\</div\>";
        
        //vis
        //visualize(resolve(controlDeps(ast) + dataDeps(ast)));
       // renderSave(graph2figure(resolve(controlDeps(ast) + dataDeps(ast))), |cwd:///hola.jpg|);
        //rst += <
        
        //<resolve(controlDeps(ast) + dataDeps(ast))>
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
	div(id("header"), () {
	    h2(class("tmpo"),"Celsius to fahrenheit converter");
	    
	    //Not working
	    //button(onClick(inc()), "+");

  	});
}

salix::Node::Node inp() = render(pp);

str mmm(void(&T) viewX) {
	salix::Node::Node tt = render(viewX);
	return toHTML(tt);
}

str toHTML(salix::Node::Node root){
	switch(root){
		case element(str tagName, list[salix::Node::Node] kids, map[str, str] attrs, map[str, str] props, map[str, salix::Node::Hnd] events):
			return "\<<tagName> <parseAttrs(attrs)>\><parseNodesList(kids)>\</<tagName>\>";		
		case txt(str contents):
			return "<contents>";
		default: "";
	}
	return "";
}

str parseAttrs(map[str, str] attrs){
	return (""|"<key> = \"<attrs[key]> \""| key <- attrs);
}

str parseNodesList(list[salix::Node::Node] lstnodes){
	if(!isEmpty(lstnodes))
		return (""|toHTML(x)| salix::Node::Node x <- lstnodes);
	else
		return "";
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
//ast = implodeQL(parse(#start[Form], readFile(|project://RascalQLTutorial/examples/tax.tql|)));
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