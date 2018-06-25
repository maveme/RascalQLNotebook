module Parse

import QL;
import NotebookQL;
import ParseTree;

import util::Brackets;
import lang::rascal::grammar::definition::Priorities;


start[CommandForm] parseQL(loc l) = parse(#start[CommandForm], l);
start[CommandForm] parseQL(str src) = parse(#start[CommandForm], src);
start[CommandForm] parseQL(str src, loc l) = parse(#start[CommandForm], src, l);
start[CommandForm] parseExample(str example) = parseQL(|project://RascalQLTutorial/examples/<example>|);

DoNotNest qlPriorities() = prioritiesOf(#CommandForm);