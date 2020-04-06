using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace Transferalize
{

    public class TSAccordionBase : ComponentBase
    {

        public ElementReference TSAccordionContainer;

        [Parameter]
        public RenderFragment ChildContent { get; set; }

        public TSAccordionOptions AccordionOpts { get; set; }

        [Inject] protected IJSRuntime JSInterop { get; set; }

        [Parameter]
        public string Type { get; set; } = "";

        [Parameter]
        public bool Accordion { get; set; } = true;

        protected override async Task OnAfterRenderAsync(bool firstRender)
        {
            if (firstRender)
            {
                SetOptionsByParameters();
                _ = await JSInterop.InvokeAsync<object>("RunTSAccordion", TSAccordionContainer, AccordionOpts);
                StateHasChanged();
            }
        }

        private void SetOptionsByParameters()
        {
            AccordionOpts = new TSAccordionOptions
            {
                Type = Type,
                Accordion = Accordion
            };
        }

    }
}
