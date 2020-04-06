using Microsoft.AspNetCore.Components;
using Microsoft.JSInterop;
using System.Threading.Tasks;

namespace Transferalize
{

    public class TSAccordionBase : ComponentBase
    {

        public ElementReference TSAccordionContainer;

        public TSAccordionOptions AccordionOpts { get; set; }

        [Inject] protected IJSRuntime JSInterop { get; set; }

        [Parameter]
        public string Text { get; set; } = "";

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
                Text = Text
            };
        }

    }
}
