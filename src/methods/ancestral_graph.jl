mod10(x) = mod(x, 10)
mod100(x) = mod(x, 100)


function update_s(a::NamedArray, c::Vector{Symbol}, debug=false)
  vars = names(a, 1)
  s = copy(c)
  st = Symbol[]
  while !(s == st)
    st = copy(s)
    for j in s
      for i in vars
        mod10(a[i, j]) == 1 && union!(s, [i])
      end
    end
  end
  debug && println(s)
  s
end

function update_21(ar::NamedArray, marg_vars::Vector{Symbol}, debug=false)

  vars = names(ar, 1)
  a21 = copy(ar)

  for i in marg_vars
    for j in names(ar, 1)
      a31 = copy(ar)
      if mod10(ar[j, i]) == 1 || mod10(ar[i, j]) == 1
        a31[i, j] = ar[j, i]
        a31[j, i] = ar[i, j]
        debug && println("Update: a31[$i, $j] = $(ar[j, i])")
        debug && println("Update: a31[$j, $i] = $(ar[i, j])")
      end
      idx = vars[findall(x -> mod10(x) == 1, a31[:, i])]
      if length(idx) > 1 && mod10(a31[j, i]) == 1
        for k in idx
          if mod10(ar[k, j]) == 0 && k != j
            debug && println([k, j, 1])
            a21[k, j] = 1
          end
        end
      end
    end
  end
  a21
end

function update_22(ar::NamedArray, s::Vector{Symbol}, debug=false)

  vars = names(ar, 1)
  a22 = NamedArray(zeros(Int, size(ar)), (vars, vars), ("Rows", "Cols"));

  for i in s
    idx = vars[findall(x -> StructuralCausalModels.mod10(x) == 1, ar[:, i])]
    idy = vars[findall(x -> x > 99, ar[:, i])]
    if length(idx) > 0 && length(idy) >0
      for j in idx
        for k in idy
          if StructuralCausalModels.mod10(ar[j, k]) == 0 && j != k
            debug && println([j, k, 1])
            a22[j, k] = 1
          end
        end
      end
    end
  end
  a22
end

function update_23(ar::NamedArray, m::Vector{Symbol}, debug=false)

  vars = names(ar, 1)
  a23 = NamedArray(zeros(Int, size(ar)), (vars, vars), ("Rows", "Cols"));

  for i in m
    idx = vars[findall(x -> StructuralCausalModels.mod10(x) == 1, ar[i, :])]
    idy = vars[findall(x -> StructuralCausalModels.mod100(x) > 9, ar[i, :])]
    if length(idx) > 0 && length(idy) > 0
      for j in idx
        for k in idy
          if StructuralCausalModels.mod10(ar[k, j]) == 0 && j !== k
            debug && println([k, j, 1])
            a23[k, j] = 1
          end
        end
      end
    end
  end
  a23
end

function update_24(ar::NamedArray, m::Vector{Symbol}, debug=false)

  vars = names(ar, 1)
  a24 = NamedArray(zeros(Int, size(ar)), (vars, vars), ("Rows", "Cols"));

  for i in m
    idx = vars[findall(x -> StructuralCausalModels.mod100(x) > 9, ar[:, i])]
    idy = vars[findall(x -> x > 99, ar[:, i])]
    if length(idx) > 0 && length(idy) > 0
      for j in idx
        for k in idy
          if StructuralCausalModels.mod10(ar[j, k]) == 0 && j !== k
            debug && println([j, k, 1])
            a24[j, k] = 1
          end
        end
      end
    end
  end
  a24
end

function update_25(ar::NamedArray, m::Vector{Symbol}, debug=false)

  vars = names(ar, 1)
  a25 = NamedArray(zeros(Int, size(ar)), (vars, vars), ("Rows", "Cols"));

  for i in m
    idx = vars[findall(x -> StructuralCausalModels.mod10(x) == 1, ar[i, :])]
    lenidx = length(idx)
    if lenidx > 1
      for j in 1:lenidx - 1
        for k in (j + 1):lenidx
          if ar[idx[j], idx[k]] < 100
            debug && println([idx[j], idx[k], 100])
            a25[idx[j], idx[k]] = 100
          end
        end
      end
    end
  end
  a25 .+ transpose(a25)
end

function update_26(ar::NamedArray, m::Vector{Symbol}, debug=false)

  vars = names(ar, 1)
  a26 = NamedArray(zeros(Int, size(ar)), (vars, vars), ("Rows", "Cols"));

  for i in m
    idx = vars[findall(x -> StructuralCausalModels.mod10(x) == 1, ar[i, :])]
    idy = vars[findall(x -> x > 99, ar[i, :])]
    if length(idx) > 0 && length(idy) >0
      for j in idx
        for k in idy
          if ar[k, j] < 100 && j !== k
            debug && println([k, j, 100])
            a26[k, j] = 100
          end
        end
      end
    end
  end
  a26 .+ transpose(a26)
end

function update_27(ar::NamedArray, s::Vector{Symbol}, debug=false)

  vars = names(ar, 1)
  a27 = NamedArray(zeros(Int, size(ar)), (vars, vars), ("Rows", "Cols"));

  for i in s
    idx = vars[findall(x -> x > 99, ar[:, i])]
    lenidx = length(idx)
    if lenidx > 1
      for j in 1:lenidx-1
        for k in (j+1):lenidx
          if ar[idx[j], idx[k]] < 100
            debug && println([idx[j], idx[k], 100])
            a27[idx[j], idx[k]] = 100
          end
        end
      end
    end
  end
  a27 .+ transpose(a27)
end

function update_28(ar::NamedArray, s::Vector{Symbol}, debug=false)

  vars = names(ar, 1)
  a28 = NamedArray(zeros(Int, size(ar)), (vars, vars), ("Rows", "Cols"));

  for i in s
    idx = vars[findall(x -> mod10(x) == 1, ar[:, i])]
    lenidx = length(idx)
    if lenidx > 1
      for j in 1:lenidx-1
        for k in (j+1):lenidx
          if StructuralCausalModels.mod100(ar[idx[j], idx[k]]) < 10
            debug && println([idx[j], idx[k], 10])
            a28[idx[j], idx[k]] = 10
          end
        end
      end
    end
  end
  a28 .+ transpose(a28)
end

function update_29(ar::NamedArray, m::Vector{Symbol}, debug=false)

  vars = names(ar, 1)
  a29 = NamedArray(zeros(Int, size(ar)), (vars, vars), ("Rows", "Cols"));

  for i in m
    idx = vars[findall(x -> StructuralCausalModels.mod10(x) == 1, ar[:, i])]
    idy = vars[findall(x -> StructuralCausalModels.mod100(x) > 9, ar[:, i])]
    if length(idx) > 0 && length(idy) >0
      for j in idx
        for k in idy
          if mod100(ar[k, j]) < 10 && j !== k
            debug && println([k, j, 10])
            a29[k, j] = 10
          end
        end
      end
    end
  end
  a29 .+ transpose(a29)
end

function update_30(ar::NamedArray, m::Vector{Symbol}, debug=false)

  vars = names(ar, 1)
  a30 = NamedArray(zeros(Int, size(ar)), (vars, vars), ("Rows", "Cols"));

  for i in m
    idx = vars[findall(x -> StructuralCausalModels.mod100(x) > 9, ar[:, i])]
    lenidx = length(idx)
    if lenidx > 1
      for j in 1:lenidx-1
        for k in (j+1):lenidx
          if StructuralCausalModels.mod100(ar[idx[j], idx[k]]) < 10
            debug && println([idx[j], idx[k], 10])
            a30[idx[j], idx[k]] = 10
          end
        end
      end
    end
  end
  a30 .+ transpose(a30)
end

function update_a(ar::NamedArray, debug=false)
  vars = names(ar, 1)
  a = copy(ar)
  for i in vars
    for j in vars
      if mod100(a[i, j]) > 9
        a[i, j] = 10
        for k in vars
          if a[k, j] == 100
            a[j, k] = 1
            debug && println([j, k, 1])
            a[k, j] = 0
            debug && println([k, j, 0])
          end
        end
      end
    end
  end
  a
end

function update_b(ar::NamedArray, s::Vector{Symbol}, debug=false)
  vars = names(ar, 1)
  a = copy(ar)
  s2 = copy(s)
  while true
    st = copy(s2)
    for j in s2
      for k in vars
        if mod10(a[k, j]) == 1
          debug && !(k in s2) && println("$k added to $s2")
          s2 = union!(s2, [k])
        end
      end
    end
    s2 == st && break
  end
  debug && println("\n$s2\n")
  for i in s2
    for j in s2
      if mod10(a[i, j]) == 1
        a[i, j] = 10
        debug && println([i, j, 10])
        a[j, i] = 10
        debug && println([j, i, 10])
      end
    end
  end
  a
end

function update_an(ar::NamedArray, debug=false)
  vars = names(ar, 1)
  an = copy(ar)
  for i in vars
    for j in vars
      a3n = copy(ar)
      if mod10(ar[j, i]) == 1 || mod10(ar[i, j]) == 1
        a3n[i, j] = ar[j, i]
        debug && println("Update: a3n[$i, $j] = $(ar[j, i])")
        a3n[j, i] = ar[i, j]
        debug && println("Update: a3n[$j, $i] = $(ar[i, j])")
      end
      idx = vars[findall(x -> StructuralCausalModels.mod10(x) == 1, a3n[:, i])]
      if length(idx) > 1 && mod10(a3n[j, i]) == 1
        for k in idx
          if mod10(ar[k, j]) == 0 && k != j
            debug && println([k, j, 1])
            an[k, j] = 1
          end
        end
      end
    end
  end
  an
end

function update_27n(ar::NamedArray, an::NamedArray, debug=false)
  vars = names(ar, 1)
  a27n = NamedArray(zeros(Int, size(ar)), (vars, vars), ("Rows", "Cols"));
  for i in vars
    idx = vars[findall(x -> x > 99, an[:, i])]
    lenidx = length(idx)
    if length(idx) > 1
      for j in 1:lenidx-1
        for k in (j + 1):lenidx
          if ar[idx[j], idx[k]] < 100 && 
            mod10(an[i, idx[j]]) == 1 ||
            an[i, idx[k]] == 1

            debug && println([idx[j], idx[k], 100])
            a27n[idx[j], idx[k]] == 100
          end
        end
      end
    end
  end
  a27n
end

function update_22n(ar::NamedArray, an::NamedArray, debug=false)
  vars = names(ar, 1)
  a22n = NamedArray(zeros(Int, size(ar)), (vars, vars), ("Rows", "Cols"));
  for i in vars
    idx = vars[findall(x -> mod10(x) == 1, an[:, i])]
    idy = vars[findall(x -> x > 99, an[:, i])]
    if length(idx) > 0 && length(idy) > 0
      for j in idx
        for k in idy
          if mod10(ar[j, k]) == 0 &&
            j != k && 
            mod10(an[i, k]) == 1

            a22n[j, k] = 1
            debug &&println([j, k, 1])
          end
        end
      end
    end
  end
  a22n
end

function update_i(ar::NamedArray, debug=false)
  vars = names(ar, 1)
  a = copy(ar)
  for i in vars
    for j in vars
      if a[i, j] == 101
        a[i, j] = 1
        debug && println([i, j, 1])
        a[j, i] = 0
        debug && println([j, i, 0])
      end
    end
  end
  a
end

"""
    
# ancestral_graph

$(SIGNATURES)

Ancestral graphs after marginalization and conditioning.

### Required arguments
```julia
* `a::NamedArray{Int, 2}`              : Adjacency matrix of a DAG
```

### Optional arguments
```julia
* `m::Vector{Symbol}`                  : Nodes in DAG that are marginalized
* `c::Vector{Symbol})`                 : Nodes in DAG there are conditioned on
```

### Returns
```julia
* `ag::NamedTuple`                     : Ancestral graph remaining
```

# Extended help

### Example

### Adjacency matrix used for testing in ggm

```julia
amat_data = transpose(reshape([
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,
  0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,
  0,0,0,0,1,0,1,0,1,1,0,0,0,0,0,0,
  1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,
  0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,
  1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,
  0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0
], (16,16)));

vars = [Symbol("n\\\$i") for i in 1:size(amat_data, 1)]
a = NamedArray(Int.(amat_data), (vars, vars), ("Rows", "Cols"));
m = [:n3, :n5, :n6, :n15, :n16];
c = [:n4, :n7];

ag = ancestral_graph(a; m = m, c = c)
```

### Acknowledgements

Original author:                       Kayvan Sadeghi

Translated to Julia:                   Rob J Goedman

### References

Sadeghi, K. (2011). Stable classes of graphs containing directed acyclic
graphs.

Richardson, T.S. and Spirtes, P. (2002).  Ancestral graph Markov
models {Annals of Statistics}, 30(4), 962-1030.

### Licence

The R package ggm is licensed under License: GPL-2.

The Julia translation is licenced under: MIT.

Part of the api, exported.
"""
function ancestral_graph(a::NamedArray{Int, 2}; m=Symbol[], c=Symbol[])
  
  vars = names(a, 1)
  s = update_s(a, c)

  ar = copy(a)
  at = 2a

  while true

    at = copy(ar)
    ar = update_21(ar, m)
    ar .+= update_22(ar, s)
    ar .+= update_23(ar, m)
    ar .+= update_24(ar, m)
    ar .+= update_25(ar, m)
    ar .+= update_26(ar, m)
    ar .+= update_27(ar, s)
    ar .+= update_28(ar, s)
    ar .+= update_29(ar, m)
    ar .+= update_30(ar, m)

    ar == at && break

  end

  ar = update_a(ar)
  ar = update_b(ar, s)
  an = update_an(ar)

  while true
    at = copy(ar)

    a27n = update_27n(ar, an)
    an .+= a27n
    ar .+= a27n
    a22n = update_22n(ar, an)
    an .+= a22n
    ar .+= a22n

    at == ar && break
  end

  ar_old = copy(ar)
  ar = update_i(ar)
  select = setdiff(vars, vcat(c, m))
  fr = ar[select, select]

end

"""
    
# ancestral_graph

$(SIGNATURES)

Ancestral graphs after marginalization and conditioning.

### Required arguments
```julia
* `d::DAG`                             : DAG onject
```

### Optional arguments
```julia
* `m::Vector{Symbol}`                  : Nodes in DAG that are marginalized
* `c::Vector{Symbol})`                 : Nodes in DAG there are conditioned on
```


### Returns
```julia
* `ag::NamedTuple`                     : Ancestral graph remaining
```
"""
function ancestral_graph(d::DAG; m=Symbol[], c=Symbol[])
  ancestral_graph(d.e; m=m, c=c)
end

export
  ancestral_graph