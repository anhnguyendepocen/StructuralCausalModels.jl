var documenterSearchIndex = {"docs":
[{"location":"references/#References-1","page":"References","title":"References","text":"","category":"section"},{"location":"references/#","page":"References","title":"References","text":"StatisticalRethinking\nCausal Inference in Statistics - a primer\nCause and Correlation in Biology\nSadeghi, K. (2011). Stable classes of graphs containing directed acyclic graphs.\nRichardson, T.S. and Spirtes, P. (2002).  Ancestral graph Markov models {Annals of Statistics}, 30(4), 962-1030.\nSeparators and Adjustment Sets in Causal Graphs: Complete Criteria and an Algorithmic Framework","category":"page"},{"location":"versions/#Versions-1","page":"Versions","title":"Versions","text":"","category":"section"},{"location":"versions/#.1.0-1","page":"Versions","title":"0.1.0","text":"","category":"section"},{"location":"versions/#","page":"Versions","title":"Versions","text":"Version for initial commit to Julia's registry.\n","category":"page"},{"location":"acknowledgements/#Acknowledgements-1","page":"Acknowledgements","title":"Acknowledgements","text":"","category":"section"},{"location":"acknowledgements/#","page":"Acknowledgements","title":"Acknowledgements","text":"Important links are:","category":"page"},{"location":"acknowledgements/#","page":"Acknowledgements","title":"Acknowledgements","text":"Dagitty\nR dagitty package\nR ggm package","category":"page"},{"location":"acknowledgements/#","page":"Acknowledgements","title":"Acknowledgements","text":"The latter (both the Giordini code and the Sadeghi code) has been used as the basis for the Julia implementations of e.g. shipley_test(), d_separation(), basis_set() and ancestral_graph().","category":"page"},{"location":"introduction/#Introduction-1","page":"Introduction","title":"Introduction","text":"","category":"section"},{"location":"introduction/#","page":"Introduction","title":"Introduction","text":"StructuralCausalModels.jl (SCM) is a Julia package to analyse directed acyclic graphs (DAGs) as described in StatisticalRethinking, Causal Inference in Statistics and Cause and Correlation in Biology.","category":"page"},{"location":"introduction/#","page":"Introduction","title":"Introduction","text":"My initial goal for this package is to have a way to apply SCM ideas to the examples in StatisticalRethinking.jl, i.e. a working version of d_separation(), adjustment_sets() and implied_conditional_independencies().","category":"page"},{"location":"introduction/#","page":"Introduction","title":"Introduction","text":"StructuralCausalModels.jl is part of the StatisticalRethinkingJulia eco system. The package, once registered, can be installed using ] add StructuralCausalModels.","category":"page"},{"location":"introduction/#","page":"Introduction","title":"Introduction","text":"Please report issues or file pull requests on Github.","category":"page"},{"location":"walkthrough/#Structural-Causal-Models-1","page":"Walkthrough","title":"Structural Causal Models","text":"","category":"section"},{"location":"walkthrough/#","page":"Walkthrough","title":"Walkthrough","text":"Setup of the 'marks' example from the ggm R package:","category":"page"},{"location":"walkthrough/#","page":"Walkthrough","title":"Walkthrough","text":"using StructuralCausalModels\n\nProjDir = @__DIR__\ncd(ProjDir)\n\ndf = CSV.read(scm_path(\"..\", \"data\", \"marks.csv\"));","category":"page"},{"location":"walkthrough/#Create-a-DAG-object-1","page":"Walkthrough","title":"Create a DAG object","text":"","category":"section"},{"location":"walkthrough/#","page":"Walkthrough","title":"Walkthrough","text":"DAG() accepts either an OrderedDict, an adjacencymatrix or a ggm/dagitty string. Below dstring holds a ggm DAG definition.","category":"page"},{"location":"walkthrough/#","page":"Walkthrough","title":"Walkthrough","text":"d_string = \"DAG(\n    mechanics ~ vectors+algebra, \n    vectors ~ algebra, \n    statistics ~ algebra+analysis, \n    analysis ~ algebra)\"\n\ndag = DAG(\"marks\", d_string, df);\nshow(dag)","category":"page"},{"location":"walkthrough/#","page":"Walkthrough","title":"Walkthrough","text":"Optional display the DAG using GraphViz:","category":"page"},{"location":"walkthrough/#","page":"Walkthrough","title":"Walkthrough","text":"fname = ProjDir * \"/marks.dot\"\nto_graphviz(dag, fname)\nSys.isapple() && run(`open -a GraphViz.app $(fname)`)","category":"page"},{"location":"walkthrough/#","page":"Walkthrough","title":"Walkthrough","text":"or just show a printed summary and the covariance matrix:","category":"page"},{"location":"walkthrough/#","page":"Walkthrough","title":"Walkthrough","text":"display(dag)\nprintln()\ndisplay(dag.s); println()","category":"page"},{"location":"walkthrough/#Basis-set-1","page":"Walkthrough","title":"Basis set","text":"","category":"section"},{"location":"walkthrough/#","page":"Walkthrough","title":"Walkthrough","text":"Compute the basis_set:","category":"page"},{"location":"walkthrough/#","page":"Walkthrough","title":"Walkthrough","text":"bs = basis_set(dag)\ndisplay(bs)","category":"page"},{"location":"walkthrough/#Shipley-test-1","page":"Walkthrough","title":"Shipley test","text":"","category":"section"},{"location":"walkthrough/#","page":"Walkthrough","title":"Walkthrough","text":"Perform the Shipley test:","category":"page"},{"location":"walkthrough/#","page":"Walkthrough","title":"Walkthrough","text":"t = shipley_test(dag)\ndisplay(t); println()","category":"page"},{"location":"walkthrough/#D_separation-1","page":"Walkthrough","title":"D_separation","text":"","category":"section"},{"location":"walkthrough/#","page":"Walkthrough","title":"Walkthrough","text":"Show several d_separation results:","category":"page"},{"location":"walkthrough/#","page":"Walkthrough","title":"Walkthrough","text":"f = [:statistics]; s = [:mechanics]; sel = vcat(f, s)\ncond = [:algebra]\n\ne = d_separation(dag, f, s, cond)\nprintln(\"d_separation($(dag.name), $f, $s, $cond) = $e\")\n\ne = d_separation(dag, f, s)\nprintln(\"d_separation($(dag.name), $f, $s) = $e\")\n\nprint(\"d_separation($(dag.name), [:statistics], [:mechanics], [:vectors]) = \")\nprintln(d_separation(dag, [:statistics], [:mechanics], [:vectors]))\n\nprint(\"d_separation($(dag.name), [:statistics], [:mechanics], [:analysis, :vectors]) = \")\nprintln(d_separation(dag, [:statistics], [:mechanics], [:analysis, :vectors]))\n\nprint(\"d_separation($(dag.name), [:statistics, :analysis], [:mechanics], [:algebra]) = \")\nprintln(d_separation(dag, [:statistics, :analysis], [:mechanics], [:algebra]))\n\nprint(\"d_separation($(dag.name), [:statistics], [:mechanics, :vectors], [:algebra]) = \")\nprintln(d_separation(dag, [:statistics], [:mechanics, :vectors], [:algebra]))\n\nprint(\"d_separation($(dag.name), [:statistics], [:mechanics, :analysis], [:algebra]) = \")\nprintln(d_separation(dag, [:statistics], [:mechanics, :analysis], [:algebra]))\n\nprint(\"d_separation($(dag.name), [:analysis], [:vectors]) = \")\nprintln(d_separation(dag, [:analysis], [:vectors]))\n\nprint(\"d_separation($(dag.name), [:analysis], [:vectors], [:algebra]) = \")\nprintln(d_separation(dag, [:analysis], [:vectors], [:algebra]))\n\nprint(\"d_separation($(dag.name), [:vectors], [:statistics], [:algebra]) = \")\nprintln(d_separation(dag, [:analysis], [:vectors], [:algebra]))\n\nprint(\"d_separation($(dag.name), [:statistics], [:algebra], [:analysis]) = \")\nprintln(d_separation(dag, [:statistics], [:algebra], [:analysis]))\n\nprint(\"d_separation($(dag.name), [:statistics, :analysis], [:mechanics, :vectors]) = \")\nprintln(d_separation(dag, [:statistics, :analysis], [:mechanics, :vectors]))\n\nprint(\"d_separation($(dag.name), [:statistics, :analysis], [:mechanics, :vectors], [:algebra]) = \")\nprintln(d_separation(dag, [:statistics, :analysis], [:mechanics, :vectors], [:algebra]))","category":"page"},{"location":"walkthrough/#Adjustment-sets-1","page":"Walkthrough","title":"Adjustment sets","text":"","category":"section"},{"location":"walkthrough/#","page":"Walkthrough","title":"Walkthrough","text":"Setup the WaffleDivorce example from StatisticalRethinking:","category":"page"},{"location":"walkthrough/#","page":"Walkthrough","title":"Walkthrough","text":"using StructuralCausalModels\n\nProjDir = @__DIR__\ncd(ProjDir) #do\n\ndf = CSV.read(scm_path(\"..\", \"data\", \"WaffleDivorce.csv\"), delim=';');\ndf = DataFrame(\n  :s => df[:, :South],\n  :a => df[:, :MedianAgeMarriage],\n  :m => df[:, :Marriage],\n  :w => df[:, :WaffleHouses],\n  :d => df[:, :Divorce]\n);\n\nfname = scm_path(\"..\", \"examples\", \"SR\", \"SR6.4.3\", \"sr6.4.3.dot\")\nSys.isapple() && run(`open -a GraphViz.app $(fname)`)\n\nd = OrderedDict(\n  :s => [:a, :m, :w],\n  :a => [:m, :d],\n  :m => [:d],\n  :w => [:d]\n);\nu = []\n\ndag = DAG(\"sr6.4.3\", d, df);\nshow(dag)\n\nadjustmentsets = adjustment_sets(dag, :w, :d)\nprintln(\"Adjustment sets for open paths: $(openpaths)\\n\")\nadjustmentsets |> display","category":"page"},{"location":"walkthrough/#Paths-1","page":"Walkthrough","title":"Paths","text":"","category":"section"},{"location":"walkthrough/#","page":"Walkthrough","title":"Walkthrough","text":"Adjustment_sets is based on several path manipulations and checks:","category":"page"},{"location":"walkthrough/#","page":"Walkthrough","title":"Walkthrough","text":"allpaths  = all_paths(dag, :w, :d)\nprintln(\"All paths between :x and :y:\")\nallpaths |> display\nprintln()\n\nbackdoorpaths = backdoor_paths(dag, allpaths, :w)\nprintln(\"All backdoors between :w and :d:\")\nbackdoorpaths |> display\nprintln()\n\nopenpaths = open_paths(dag, backdoorpaths)\nprintln(\"All open (backdoor) paths between :w and :d:\")\nopenpaths |> display\nprintln()\n\nprintln(\"Show path: $(allpaths[2])\")\nshow_dag_path(dag, allpaths[2]) |> display\nprintln()","category":"page"},{"location":"walkthrough/#Ancestral-graph-1","page":"Walkthrough","title":"Ancestral graph","text":"","category":"section"},{"location":"walkthrough/#","page":"Walkthrough","title":"Walkthrough","text":"Setup an ancestral_graph example:","category":"page"},{"location":"walkthrough/#","page":"Walkthrough","title":"Walkthrough","text":"using StructuralCausalModels, Test\n\nProjDir = @__DIR__\n\n#include(scm_path(\"test_methods\", \"test_ag.jl\"))\n\namat_data = transpose(reshape([\n  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,\n  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,\n  1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,\n  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,\n  0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,\n  0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,\n  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,\n  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,\n  0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,\n  0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,\n  0,0,0,0,1,0,1,0,1,1,0,0,0,0,0,0,\n  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,\n  0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,\n  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,\n  1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,\n  0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0\n], (16,16)));\n\n\nvars = [Symbol(\"n$i\") for i in 1:size(amat_data, 1)]\na = NamedArray(Int.(amat_data), (vars, vars), (\"Rows\", \"Cols\"));\n\ndag = DAG(\"ag_example\", a)\n\nm = [:n3, :n5, :n6, :n15, :n16];\nc = [:n4, :n7];\n\nfr = StructuralCausalModels.test_ag(a; m=m, c=c)\n\nfr1 = ancestral_graph(a; m=m, c=c)\n@test all(fr .== fr1)\n\nfr2 = StructuralCausalModels.test_ag(dag.a; m=m, c=c)\n@test all(fr .== fr2);\n\nprintln()\ndisplay(fr)\nprintln()","category":"page"},{"location":"#","page":"StructuralCausalModels API","title":"StructuralCausalModels API","text":"CurrentModule = StructuralCausalModels","category":"page"},{"location":"#scm_path-1","page":"StructuralCausalModels API","title":"scm_path","text":"","category":"section"},{"location":"#","page":"StructuralCausalModels API","title":"StructuralCausalModels API","text":"scm_path(parts...)","category":"page"},{"location":"#StructuralCausalModels.scm_path-Tuple","page":"StructuralCausalModels API","title":"StructuralCausalModels.scm_path","text":"scm_path\n\nRelative path using the StructuralCausalModels.jl src/ directory.\n\nExample to get access to the data subdirectory\n\nscm_path(\"..\", \"data\")\n\n\n\n\n\n","category":"method"},{"location":"#DAG-1","page":"StructuralCausalModels API","title":"DAG","text":"","category":"section"},{"location":"#","page":"StructuralCausalModels API","title":"StructuralCausalModels API","text":"DAG\nDAG(name::AbstractString, d::OrderedDict, df::DataFrame)\nDAG(name::AbstractString, d::OrderedDict)\nDAG(name::AbstractString, str::AbstractString, df::DataFrame)\nDAG(name::AbstractString, str::AbstractString)\nDAG(name::AbstractString, a::NamedArray, df::DataFrame)\nDAG(name::AbstractString, a::NamedArray)","category":"page"},{"location":"#StructuralCausalModels.DAG","page":"StructuralCausalModels API","title":"StructuralCausalModels.DAG","text":"DAG\n\nDirected acyclic graph struct\n\nStruct\n\nDAG(\n* `name::AbstractString`                    : A name for the DAG object\n* `d::OrderedDictOrNothing`                 : DAG definition as an OrderedDict\n* `a::NamedArrayOrNothing`                  : Adjacency matrix\n* `e::NamedArrayOrNothing`                  : Edge matrix\n* `s::NamedArrayOrNothing`                  : Covariance matrix (optional)\n* `df::DataFrameOrNothing`                  : Variable observations (optional)\n* `vars::Vector{Symbol}`                    : Names of variables\n)\n\nPart of API, exported.\n\n\n\n\n\n","category":"type"},{"location":"#StructuralCausalModels.DAG-Tuple{AbstractString,OrderedDict,DataFrame}","page":"StructuralCausalModels API","title":"StructuralCausalModels.DAG","text":"DAG\n\nDirected acyclic graph constructor\n\nDAG(name, d, df)\n\n\nRequired arguments\n\n* `name::AbstractString`               : Variables used to compute correlation\n* `d`                                  : DAG definition as an\n                                           OrderedDict (see extended help)\n                                           AbstractString (as in ggm or dagitty)\n                                           AdjacencyMatrix\n\nOptional positional argument\n\n* `df::DataFrame`                      : DataFrame with observations\n\nReturns\n\n* `dag::DAG`                           : Boolean result of test\n\nExtended help\n\nIn the definition of the OrderedDict, read => as ~ in regression models or <- in causal models, e.g.\n\nd = OrderedDict(\n  :u => [:x, :v],\n  :s1 => [:u],\n  :w => [:v, :y],\n  :s2 => [:w]\n);\ndag = DAG(\"my_name\", d)\n\nComing from R's dagitty:\n\namat <- dagitty(\"dag { {X V} -> U; S1 <- U; {Y V} -> W; S2 <- W}”)\n\ndag = DAG(\"my_name\", \"dag { {X V} -> U; S1 <- U; {Y V} -> W; S2 <- W}”)\ndisplay(dag.a) # Show the adjacency_matrix\n\nComing from R's ggm:\n\namat <- DAG(U~X+V, S1~U, W~V+Y, S2~W, order=FALSE)\n\ndag = DAG(\"my_name\", \"DAG(U~X+V, S1~U, W~V+Y, S2~W”)\ndisplay(dag.a) # Show the adjacency_matrix\n\nAcknowledgements\n\nOriginal author:                       Giovanni M. Marchetti\n\nTranslated to Julia:                   Rob J Goedman\n\nLicense\n\nThe R package ggm is licensed under License: GPL-2.\n\nThe Julia translation is licenced under: MIT.\n\nPart of API, exported.\n\n\n\n\n\n","category":"method"},{"location":"#d_separation-1","page":"StructuralCausalModels API","title":"d_separation","text":"","category":"section"},{"location":"#","page":"StructuralCausalModels API","title":"StructuralCausalModels API","text":"d_separation(d::DAG, first::Vector{Symbol}, second::Vector{Symbol}, cond::SymbolList=nothing)","category":"page"},{"location":"#StructuralCausalModels.d_separation","page":"StructuralCausalModels API","title":"StructuralCausalModels.d_separation","text":"d_separation\n\nd_separation(d, first, second)\nd_separation(d, first, second, cond; debug)\n\n\nComputes the d_separation between 2 sets of nodes conditioned on a third set.\n\nRequired arguments\n\nd_separation(\n* `d::DAG`                             : DAG\n* `first::Vector{Symbol}`              : First set\n* `second::Vector{Symbol}`             : Second set\n)\n\nOptional arguments\n\n* `cond::Vector{Symbol}`               : Conditioning set\n* `debug=false`                        : Trace execution\n\nReturns\n\n* `res::Bool`                          : Boolean result of test\n\nExtended help\n\nExample\n\nd_separation between mechanics and statistics, conditioning on algebra\n\nusing StructuralCausalModels, CSV\n\ndf = CSV.read(scm_path(\"..\", \"data\", \"marks.csv\");\n\nd = OrderedDict(\n  :mechanics => [:vectors, :algebra],\n  :vectors => [:algebra],\n  :analysis => [:algebra],\n  :statistics => [:algebra, :analysis]\n);\n\ndag = DAG(\"marks\", d, df);\nd_separation(marks, [:statistics], [:mechanics], [:algebra]))\n\nAcknowledgements\n\nOriginal author:                       Giovanni M. Marchetti\n\nTranslated to Julia:                   Rob J Goedman\n\nLicense\n\nThe R package ggm is licensed under License: GPL-2.\n\nThe Julia translation is licenced under: MIT.\n\nPart of the API, exported.\n\n\n\n\n\n","category":"function"},{"location":"#shipley_test-1","page":"StructuralCausalModels API","title":"shipley_test","text":"","category":"section"},{"location":"#","page":"StructuralCausalModels API","title":"StructuralCausalModels API","text":"shipley_test(d::DAG)","category":"page"},{"location":"#StructuralCausalModels.shipley_test-Tuple{DAG}","page":"StructuralCausalModels API","title":"StructuralCausalModels.shipley_test","text":"shipley_test\n\nshipley_test(d)\n\n\nTest of all independencies implied by a given DAG\n\nComputes a simultaneous test of all independence relationships implied by a given Gaussian model defined according to a directed acyclic graph, based on the sample covariance matrix.\n\nThe test statistic is C = -2 sum(ln(pj)) where pj are the p-values of tests of conditional independence in the basis set computed by basiSet(A). The p-values are independent uniform variables on (0,1) and the statistic has exactly a chi square distribution on 2k degrees of freedom where k is the number of elements of the basis set.  Shipley (2002) calls this test Fisher's C test.\n\nMethod\n\nshipley_test(;\n* `d::Dag`                             : Directed acyclic graph\n)\n\nReturns\n\n* `res::NamedTuple`                    : (ctest=..., dof=..., pval=...)\n\nwhere:\n\nctest: Test statistic C   dof:   Degrees of freedom.   pval:  The P-value of the test, assuming a two-sided alternative.\n\nExtended help\n\nExample\n\nShipley_test for the mathematics marks data\n\nusing StructuralCausalModels, RData\n\nobjs = RData.load(scm_path(\"..\", \"data\", \"marks.rda\");\nmarks_df = objs[\"marks\"]\n\nd = OrderedDict(\n  :mechanics => [:vectors, :algebra],\n  :vectors => [:algebra],\n  :statistics => [:algebra, :analysis],\n  :analysis => [:algebra]\n);\ndag = Dag(d; df=df)\nshipley_test(dag)\n\nSee also\n\n?Dag\n?basis_set\n?pcor_test\n\nAcknowledgements\n\nOriginal author:                       Giovanni M. Marchetti\n\nTranslated to Julia:                   Rob J Goedman\n\nReferences\n\nShipley, B. (2000). A new inferential test for path models based on directed acyclic graphs. Structural Equation Modeling, 7(2), 206–218.\n\nLicence\n\nThe R package ggm is licensed under License: GPL-2.\n\nThe Julia translation is licenced under: MIT.\n\nPart of the api, exported.\n\n\n\n\n\n","category":"method"},{"location":"#basis_set-1","page":"StructuralCausalModels API","title":"basis_set","text":"","category":"section"},{"location":"#","page":"StructuralCausalModels API","title":"StructuralCausalModels API","text":"basis_set(dag::DAG)","category":"page"},{"location":"#StructuralCausalModels.basis_set-Tuple{DAG}","page":"StructuralCausalModels API","title":"StructuralCausalModels.basis_set","text":"basis_set\n\nDetermine basis_set\n\nbasis_set(dag)\n\n\nPart of API, exported.\n\n\n\n\n\n","category":"method"},{"location":"#ancestral_graph-1","page":"StructuralCausalModels API","title":"ancestral_graph","text":"","category":"section"},{"location":"#","page":"StructuralCausalModels API","title":"StructuralCausalModels API","text":"ancestral_graph(d::DAG, m::Vector{Symbol}, c::Vector{Symbol})\nancestral_graph(a::NamedArray{Int, 2}, m::Vector{Symbol}, c::Vector{Symbol})","category":"page"},{"location":"#adjustment_sets-1","page":"StructuralCausalModels API","title":"adjustment_sets","text":"","category":"section"},{"location":"#","page":"StructuralCausalModels API","title":"StructuralCausalModels API","text":"adjustment_sets(d::DAG, f::Symbol, l::Symbol, u::Vector{Symbol})\nadjustment_sets(d::DAG, f::Symbol, l::Symbol)","category":"page"},{"location":"#paths-1","page":"StructuralCausalModels API","title":"paths","text":"","category":"section"},{"location":"#","page":"StructuralCausalModels API","title":"StructuralCausalModels API","text":"all_paths(d::DAG, f::Symbol, l::Symbol)\nbackdoor_paths(d::DAG, paths::Vector{Vector{Symbol}}, f::Symbol)\ncheck_open(d::DAG, path::Vector{Symbol})\nopen_paths(d::DAG, paths::Vector{Vector{Symbol}})\n","category":"page"},{"location":"#Internals-1","page":"StructuralCausalModels API","title":"Internals","text":"","category":"section"},{"location":"#","page":"StructuralCausalModels API","title":"StructuralCausalModels API","text":"adjacency_matrix(d::OrderedDict)\nadjacency_matrix(e::NamedArray)\nadjacency_matrix_to_dict(ea::NamedArray)\nancester_graph(e::NamedArray)\nall_edges(a::NamedArray)\nblocking_sets(asets::Array{Array{Symbol,1},1})\ndag_show(io::IO, d::DAG)\ndag_vars(d::OrderedDict)\nedge_matrix(d::OrderedDict)\nedge_matrix(a::NamedArray, inv=false)\nforward_path(d::DAG, path)\nhandle_rhs!(vars::Vector{Symbol}, rhs::SymbolList)\nindicator_matrix(e::NamedArray)\ninduced_covariance_graph(d::DAG, sel::Vector{Symbol}, cond::SymbolList; debug=false)\nnode_edges(p::Path, s::Symbol, l::Symbol)\npcor(u::Vector{Symbol}, S::NamedArray)\ntopological_order(a::NamedArray)\ntopological_sort(a::NamedArray)\ntransitive_closure(a::NamedArray)\nset_dag_df!(d::DAG, df::DataFrameOrNothing; force=false)\nset_dag_cov_matrix!(d::DAG, cm::NamedArrayOrNothing; force=false)\nundirected_matrix(d::DAG)","category":"page"},{"location":"#StructuralCausalModels.adjacency_matrix-Tuple{OrderedDict}","page":"StructuralCausalModels API","title":"StructuralCausalModels.adjacency_matrix","text":"adjacency_matrix\n\nadjacency_matrix(d)\n\n\nInternal\n\n\n\n\n\n","category":"method"},{"location":"#StructuralCausalModels.adjacency_matrix-Tuple{NamedArray}","page":"StructuralCausalModels API","title":"StructuralCausalModels.adjacency_matrix","text":"adjacency_matrix\n\nadjacency_matrix(e)\n\n\nInternal\n\n\n\n\n\n","category":"method"},{"location":"#StructuralCausalModels.adjacency_matrix_to_dict-Tuple{NamedArray}","page":"StructuralCausalModels API","title":"StructuralCausalModels.adjacency_matrix_to_dict","text":"adjacency_matrix to OrderedDict\n\nadjacency_matrix_to_dict(ea)\n\n\nInternal\n\n\n\n\n\n","category":"method"},{"location":"#StructuralCausalModels.ancester_graph-Tuple{NamedArray}","page":"StructuralCausalModels API","title":"StructuralCausalModels.ancester_graph","text":"ancestor_graph\n\nancester_graph(e)\n\n\nInternal\n\n\n\n\n\n","category":"method"},{"location":"#StructuralCausalModels.dag_vars-Tuple{OrderedDict}","page":"StructuralCausalModels API","title":"StructuralCausalModels.dag_vars","text":"dag_vars\n\ndag_vars(d)\n\n\nInternal\n\n\n\n\n\n","category":"method"},{"location":"#StructuralCausalModels.edge_matrix-Tuple{OrderedDict}","page":"StructuralCausalModels API","title":"StructuralCausalModels.edge_matrix","text":"edge_matrix\n\nedge_matrix(d)\n\n\nInternal\n\n\n\n\n\n","category":"method"},{"location":"#StructuralCausalModels.edge_matrix","page":"StructuralCausalModels API","title":"StructuralCausalModels.edge_matrix","text":"edge_matrix\n\nedge_matrix(a)\nedge_matrix(a, inv)\n\n\nInternal\n\n\n\n\n\n","category":"function"},{"location":"#StructuralCausalModels.indicator_matrix-Tuple{NamedArray}","page":"StructuralCausalModels API","title":"StructuralCausalModels.indicator_matrix","text":"indicator_matrix\n\nindicator_matrix(e)\n\n\nInternal\n\n\n\n\n\n","category":"method"},{"location":"#StructuralCausalModels.induced_covariance_graph-Tuple{DAG,Array{Symbol,1},Union{Nothing, Array{Symbol,1}, Symbol}}","page":"StructuralCausalModels API","title":"StructuralCausalModels.induced_covariance_graph","text":"inducedcovariancegraph\n\ninduced_covariance_graph(d, sel, cond; debug)\n\n\nInternal\n\n\n\n\n\n","category":"method"},{"location":"#StructuralCausalModels.pcor-Tuple{Array{Symbol,1},NamedArray}","page":"StructuralCausalModels API","title":"StructuralCausalModels.pcor","text":"pcor\n\npcor(u, S)\n\n\nComputes the partial correlation between two variables given a set of other variables.\n\nMethod\n\npcor(;\n* `u::Vector{Symbol}`                  : Variables used to compute correlation\n* `S::Matrix`                          : Sample covariance matrix\n)\n\nwhere:\n\nu[1], u[2]: Variables used to compute correlation between, remaining variables   are the conditioning set\n\nReturns\n\n* `res::Float64`                       : Correlation between u[1] and u[2]\n\nExtended help\n\nExample\n\nCorrelation between vectors and algebra, conditioning on analysis and statistics\n\nusing StructuralCausalModels, CSV\n\ndf = CSV.read(scm_path(\"..\", \"data\", \"marks.csv\");\nS = cov(Array(df))\n\nu = [2, 3, 4, 5]\npcor(u, S)\nu = [:vectors, :algebra, :statistics, :analysis]\n\nAcknowledgements\n\nOriginal author:                       Giovanni M. Marchetti\n\nTranslated to Julia:                   Rob J Goedman\n\nLicense\n\nThe R package ggm is licensed under License: GPL-2.\n\nThe Julia translation is licenced under: MIT.\n\nPart of the api, not exported.\n\n\n\n\n\n","category":"method"},{"location":"#StructuralCausalModels.topological_order-Tuple{NamedArray}","page":"StructuralCausalModels API","title":"StructuralCausalModels.topological_order","text":"topological_order\n\ntopological_order(a)\n\n\nInternal\n\n\n\n\n\n","category":"method"},{"location":"#StructuralCausalModels.topological_sort-Tuple{NamedArray}","page":"StructuralCausalModels API","title":"StructuralCausalModels.topological_sort","text":"topological_sort\n\ntopological_sort(a)\n\n\nInternal\n\n\n\n\n\n","category":"method"},{"location":"#StructuralCausalModels.transitive_closure-Tuple{NamedArray}","page":"StructuralCausalModels API","title":"StructuralCausalModels.transitive_closure","text":"transitive_closure\n\ntransitive_closure(a)\n\n\nInternal\n\n\n\n\n\n","category":"method"},{"location":"#StructuralCausalModels.set_dag_df!-Tuple{DAG,Union{Nothing, DataFrame}}","page":"StructuralCausalModels API","title":"StructuralCausalModels.set_dag_df!","text":"setdagdf!\n\nSet or update Dataframe associated to DAG\n\nset_dag_df!(d, df; force)\n\n\nRequired arguments\n\n* `d::DAG`                                  : Previously defined DAG object \n* `df::DataFrameOrNothing`                  : DataFrame associated with DAG\n)\n\nOptional arguments\n\n* `force=false`                             : Force assignment of df \n)\n\nThe force = true option can be used if the DAG involves unobserved nodes.\n\n\n\n\n\n","category":"method"},{"location":"#StructuralCausalModels.set_dag_cov_matrix!-Tuple{DAG,Union{Nothing, NamedArray}}","page":"StructuralCausalModels API","title":"StructuralCausalModels.set_dag_cov_matrix!","text":"setdagcov_matrix!\n\nSet or update the covariance matrix associated to DAG\n\nset_dag_cov_matrix!(d, cm; force)\n\n\nRequired arguments\n\n* `d::DAG`                                  : Previously defined DAG object \n* `cm::NamedArrayOrNothing`                 : Covariance matrix in NamedArray format\n)\n\nOptional arguments\n\n* `force=false`                             : Force assignment of df \n)\n\nThe force = true option can be used if the DAG involves unobserved nodes.\n\n\n\n\n\n","category":"method"},{"location":"#StructuralCausalModels.undirected_matrix-Tuple{DAG}","page":"StructuralCausalModels API","title":"StructuralCausalModels.undirected_matrix","text":"undirected_matrix\n\nundirected_matrix(d)\n\n\nInternal\n\n\n\n\n\n","category":"method"}]
}
