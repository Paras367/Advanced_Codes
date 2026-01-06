<script>
document.addEventListener("DOMContentLoaded", function () {

    const collapses = document.querySelectorAll(".panel-collapse");

    collapses.forEach(collapse => {

        const card = collapse.closest(".card");
        if (!card) return;

        const icon = card.querySelector(".sign");
        if (!icon) return;

        collapse.addEventListener("show.bs.collapse", () => {
            icon.classList.add("rotate");
        });

        collapse.addEventListener("hide.bs.collapse", () => {
            icon.classList.remove("rotate");
        });
    });

});
</script>
