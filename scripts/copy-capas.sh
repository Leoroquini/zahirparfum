#!/usr/bin/env bash
# Copia as 43 capas cinematográficas do "Catalogo Oficial/Foto capa produto site"
# para /public/perfumes/{slug}.png conforme mapeamento validado visualmente.
set -euo pipefail

SRC="/c/Users/Leona/Desktop/Zahir Parfum/Catalogo Oficial/Foto capa produto site"
DST="/c/Users/Leona/Desktop/Zahir Parfum/site/public/perfumes"

declare -A MAP=(
  [ig_06a538bf9b55656e0169f397043f908193a690e6dd40a748da.png]=club-de-nuit-intense.png
  [ig_06a538bf9b55656e0169f39752fbc08193bf1edecb1dec611b.png]=club-de-nuit-iconic-blue.png
  [ig_06a538bf9b55656e0169f397a4c6148193b9d683b6650d9c01.png]=club-de-nuit-sillage.png
  [ig_06a538bf9b55656e0169f397fb60c481939bb528abd9ddd011.png]=club-de-nuit-urban-elixir.png
  [ig_06a538bf9b55656e0169f39843db2c8193a503791ad67b2ed8.png]=club-de-nuit-milestone.png
  [ig_06a538bf9b55656e0169f3989ec1bc8193a546ed813cb317df.png]=asad-preto.png
  [ig_06a538bf9b55656e0169f398ee0c348193abd726dfedf46ec5.png]=asad-marrom-bourbon.png
  [ig_06a538bf9b55656e0169f39943112481939408704e4275f1dd.png]=khamrah-qahwa.png
  [ig_06a538bf9b55656e0169f39a3c47988193800d6d91110b3555.png]=khamrah-preto-teriaq.png
  [ig_06a538bf9b55656e0169f39a8decac819396910e26b0d6f36b.png]=al-noble-safeer.png
  [ig_06a538bf9b55656e0169f39aea85bc8193b8c6d62147144b5d.png]=al-noble-wazeer.png
  [ig_06a538bf9b55656e0169f39b2f070c8193883183b32039fdf3.png]=al-noble-ameer.png
  [ig_06a538bf9b55656e0169f39b867aac8193aa217febd2f61cee.png]=asad-zanzibar-azul.png
  [ig_06a538bf9b55656e0169f39bdc207081938ec441545ce86424.png]=asad-elixir.png
  [ig_06a538bf9b55656e0169f39c3f9aec81938dee46079cc06dbd.png]=fakhar-preto.png
  [ig_06a538bf9b55656e0169f39c8fe8b88193ae6f7f6e4cafa552.png]=fakhar-gold-extrait.png
  [ig_06a538bf9b55656e0169f39d090660819387e02ce890d9d40c.png]=fakhar-platinum.png
  [ig_06a538bf9b55656e0169f39d42ae3c81939cbd5b824518f921.png]=the-kingdom-man.png
  [ig_06a538bf9b55656e0169f39d7d82248193943b409b82f4ac46.png]=his-confession.png
  [ig_06a538bf9b55656e0169f39dcfa3dc81938bc720e8ba0c7330.png]=maahir-black-edition.png
  [ig_06a538bf9b55656e0169f39e082cc08193b0ffc0d26ce822d4.png]=khamrah.png
  [ig_06a538bf9b55656e0169f39e5fe80c8193bd10b1d505b75cf9.png]=emeer.png
  [ig_06a538bf9b55656e0169f39e9cb0008193b24b31a7a35764b7.png]=badee-al-oud-for-glory.png
  [ig_06a538bf9b55656e0169f39efb18e4819391d8c09063be141d.png]=qaed-al-fursan.png
  [ig_06a538bf9b55656e0169f39f4d3c6c8193bbc3f4376a3c750f.png]=9pm-black.png
  [ig_06a538bf9b55656e0169f39faae1e48193bb8a8bedbeade876.png]=9pm-night-oud.png
  [ig_06a538bf9b55656e0169f39fff32dc8193be48bfc6841b731e.png]=9pm-rebel.png
  [ig_06a538bf9b55656e0169f3a0937f808193bee7c2b0cc8f36ba.png]=9pm-elixir.png
  [ig_06a538bf9b55656e0169f3a0e8523881939d71d6bceaaaddfc.png]=turathi-blue.png
  [ig_06a538bf9b55656e0169f3a134eea0819394afe58139e277c7.png]=vulcan-feu.png
  [ig_06a538bf9b55656e0169f3a180f3448193b91d1238da49e0b7.png]=ghost-spectre.png
  [ig_06a538bf9b55656e0169f3a1c5fe308193a7c3022138f195b9.png]=liquid-brun.png
  [ig_06a538bf9b55656e0169f3a20709f88193bb4732ba3ed80a4a.png]=azure-aoud.png
  [ig_06a538bf9b55656e0169f3a24440cc8193b236f52669dfc567.png]=royal-blend-bourbon.png
  [ig_06a538bf9b55656e0169f3a285aed08193aa4399e1da819092.png]=salvo.png
  [ig_06a538bf9b55656e0169f3a2e135a88193b3b8795968714fcb.png]=salvo-elixir.png
  [ig_06a538bf9b55656e0169f3a320b3f881939e7dbcf1ab0e3810.png]=salvo-intense.png
  [ig_06a538bf9b55656e0169f3a355fa088193b2e225ef0e97db02.png]=yeah-man-parfum.png
  [ig_06a538bf9b55656e0169f3a3873a3c8193adc64ca56a305b1f.png]=hawas-elixir.png
  [ig_06a538bf9b55656e0169f3a433b2548193a1ed6ab6ba2d1e10.png]=hawas-black.png
  [ig_06a538bf9b55656e0169f3a496c1bc8193970c7b3ffba03719.png]=bharara-king.png
  [ig_06a538bf9b55656e0169f3a4e72b6c81939ff4b0861a577b7e.png]=rayhaan-corium.png
  [ig_06a538bf9b55656e0169f3a53e9e048193b0b708fc5b9a1b26.png]=aether.png
)

count=0
missing=()
for src in "${!MAP[@]}"; do
  dst="${MAP[$src]}"
  if [[ -f "$SRC/$src" ]]; then
    cp -f "$SRC/$src" "$DST/$dst"
    count=$((count+1))
  else
    missing+=("$src")
  fi
done
echo "Copiadas: $count/43"
if [[ ${#missing[@]} -gt 0 ]]; then
  echo "Origens nao encontradas:"
  printf '  - %s\n' "${missing[@]}"
fi
