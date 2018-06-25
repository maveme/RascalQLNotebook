module exercises::Part2

import AST;
import Resolve;
import IO;
import List;
import String;
import FormatExpr;
import Message;
import Dependencies;

/*
 * Exercise 4 (transformation): explicit desugaring of unless to ifThen
 *
 * Example of visit:
 *  - Resolve.rsc
 *  - Outline.rsc
 * 
 * Warm up: use visit to
 *  - println out all labels in a form
 *  - count all questions (question/computed)
 *
 * Desugar:
 * - use `visit` to traverse and rewrite the Form
 * - use pattern matching to match on unless nodes.
 * - rewrite unless nodes to ifThen using =>
 *
 * The desugar function is called before compilation
 * so the compiler (Compile) does not have to be changed
 * to support unless, even if no normalize() was used.
 *
 * Optional: add unlessElse, and desugar it to ifThenElse
 * Optional: write a transformation to simplify algebraic 
 * expressions (e.g.,  1 * x, 0 + x, true && x, false && x).
 */

//Form desugar(Form f) {
//int con =0;
//  visit(f){
//  	case label(str l): println(l);
//  	case question(_,_,_): con+=1;
//  };
//  println("Number of questions: <con>");
//}

Form desugar(Form f) {
int con =0;
  visit(f){
  	case unless(cond, body) => ifThen(cond, body)
  	//case question(_,_,_): con+=1;
  };
 return f;
}


 /*
 * Exercise 5 (analysis): construct a data dependency graph.
 *
 * A computed question is dependent on the questions it refers 
 * to in its expression. Such dependencies can be represented 
 * as a binary relation (a set of tuples). The goal of this 
 * exercise is to extract such a relation.
 * - use the Node and Deps data types and nodeFor function shown 
 *   in Dependencies.rsc
 * - visit the form, and when encountering a computed question
 *   add edges to the Deps graph to record a data dependency. 
 * - use deep match (/) to find Ids in expressions
 *
 * For inspiration, the function to extract control dependencies
 * is shown Dependencies.rsc.
 *
 * Tip: use the function visualize(Deps) to visualize the result of your
 * data dependency graph. Click on nodes to see the location they
 * correspond to. 
 *
 */
 

/* NB:
 * alias Node = tuple[loc location, str label]; 
 * alias Deps = rel[Node from, Node to];
 */

set[Node] tmp() = { nodeFor(d.name) | /Id d := f};


set[Node] tmp2(Form fff, str f) = { nodeFor(d.label.label) | /Question d := fff, d has label, d.label.label == f};


Deps dataDepsZZ(Form f) {
    
	set[Node] definedIn(Node q)
    = { nodeFor(d.name) | /Question  d := f, d has name, d.name.name == "<q.label>" };

    Deps depsOf(Expr c) 
    = {<d, u> | u <- usedIn(c), d <- definedIn(u) };
    
   set[Node] usedIn(Expr e) 
    = { nodeFor(x) | /Id x := e };
    
    g={};
	visit(f){
		case computed(label, name, tipe, expr): 
			g+= depsOf(expr);
	};
  return g;
}

//
//set[Node] definedIn(Question q)
//    = { nodeFor(d.name) | /Question d := q, d has name };
//    
//  // The set variable occurrences used in an Expr.
//  set[Node] usedIn(Expr e) 
//    = { nodeFor(x) | /Id x := e };
//  
//  // Edges between defined questions in the context of q
//  // and the expression c.
//  Deps depsOf(Expr c, Question q) 
//    = {<d, u> | d <- definedIn(q), u <- usedIn(c) };
//  
//  g = {};
//  visit (f) {
//    case ifThen(c, q):
//      g += depsOf(c, q);
//    case IfThenElse(c, q1, q2):
//      g += depsOf(c, q1) + depsOf(c, q2);
//  }

Deps dataDeps(Form f) {

  // Edges between defined questions in the context of q
  // and the expression c.
 // Deps depsOf(Expr c, Question q) 
 //   = {<d, u> | d <- definedIn(q), u <- usedIn(c) };
 //   
	//visit(f){
	//	case computed(label, name, tipe, expr): s;
	//};
  return {};
}



